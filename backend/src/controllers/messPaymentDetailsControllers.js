import MessPayDetails from '../models/messPaymentDetails.model.js'; 
import dotenv from 'dotenv';

export const getDetails = async (req,res) => {
    const {sid} = req.user.sid;
    try {
        const details = await MessPayDetails.findOne({sid});
        if (!details) {
            return res.json({ message: 'No details found for this SID' });
        }
        res.status(200).json(details);
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).send("An error occurred while fetching details.");
    }
};


export const add_details = async (sid,name,month,year,amount,rebate,final_amount) => {
  try {
      const newDetails = {month,year,amount,rebate,final_amount};

      const student = await MessPayDetails.findOneAndUpdate(
          { sid },
          {
              $push: {details: newDetails }, 
          },
          { new: true, upsert: true } 
      );

      console.log("Details added successfully:");
  } catch (error) {
      console.error("Error adding details:", error);
  }
};
