import PayDetails from '../models/wardenMessPayDetails.model.js';
import User from '../models/users.model.js';
import messPayDetails from '../models/messPaymentDetails.model.js'; 
import { rebate } from '../controllers/messController.js';
import { add_details } from '../controllers/messPaymentDetailsControllers.js';
import {add_notif} from '../controllers/notifsControllers.js';

const BATCH_SIZE = 50; //to send details in student database but batch wise 

export const addDetails = async (request, response) => {
    try {
        if (request.user.role !== "warden") {
            return response.status(403).json({ message: "Access denied" });
        }

        const { month, year, amount } = request.body;

        if (!month || !year || !amount) {
            return response.status(400).json({ error: "All fields are required" });
        }

        //  // Check if an entry with the same month and year already exists
        //  const existingDetail = await PayDetails.findOne({ month, year });
        //  if (existingDetail) {
        //      return response
        //          .status(409) // Conflict status
        //          .json({ message: `Details for ${month}, ${year} already exist.` });
        //  }

        // const newDetail = new PayDetails({
        //     month,
        //     year,
        //     amount,
        // });

        // Upsert (update if exists, insert if not)
        const updatedDetail = await PayDetails.findOneAndUpdate(
            { month, year }, // Find criteria
            { month, year, amount }, // Update fields
            { new: true, upsert: true } // Options: return updated document and insert if not found 
            //update if warden enters amount for same month and year
        );

        //adding in student ka database batchwise as soon as warden updates the details
        let page = 0;
        let moreStudents = true;

        while (moreStudents) {
            const batch = await User.find({role:"student"})
                .skip(page * BATCH_SIZE)
                .limit(BATCH_SIZE);

            if (batch.length === 0) {
                    moreStudents = false;
                    break;
                }
                
            if (batch.length < BATCH_SIZE) {
                moreStudents = false;
            }

            const detailPromises =batch.map(async(st) => {
                const userId = st.sid;
                const name = st.name;
                const reb = (await rebate(userId, month, year)) ;                
                const amt = amount - reb;

                const title = "Monthly Payment Details";
                const message = "Monthly payment details are out! Kindly pay the mess fee before 20th of this month.";
                add_notif(userId,title,"mess_payDetails",message);

                return add_details(userId, name, month, year, amount, reb, amt,"pending"); //initially adding payment status as pending
        
        
    });

            await Promise.all(detailPromises);
            page++;
        }

        response.status(200).json({ message: "Payment details saved and sent to database also." });

    }
    catch (error) {
        console.error("Error adding details:", error);
        response.status(500).send("An error occurred while adding details.");
    }

};