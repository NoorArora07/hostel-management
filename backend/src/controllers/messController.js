import Mess from '../models/mess.model.js';
//import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export const getMessStatus = async (request, response) => {
//     try {
//         const messData = await Mess.findOne({ sid: request.user.sid });
//         if (!messData) return response.status(404).send("No mess data found for the student.");

//         response.status(200).json(messData);
//     } catch (error) {
//         console.error("Error fetching mess status:", error);
//         response.status(500).send("An error occurred while fetching mess status.");
//     }
// };


// export const payMessFees = async (request, response) => {
//     try {
//         const order = await razorpayInstance.orders.create({
//             amount: request.body.amount * 100, // Amount in paisa
//             currency: 'INR',
//             receipt: `receipt_${request.user.sid}_${Date.now()}`,
//         });

//         response.status(200).json({ orderId: order.id, message: "Payment initiated!" });
//     } catch (error) {
//         console.error("Error initiating payment:", error);
//         response.status(500).send("Error initiating payment.");
//     }
// };

export const MessLeaveForm = async (request, response) => {
    try {
        const { dateOfLeaving, dateOfReturn, reason, lastMeal, firstMeal } = request.body[0];

        if (!dateOfLeaving || !dateOfReturn || !reason|| !lastMeal || !firstMeal)
            return response.status(400).send("All fields are required!");

        const messData = await Mess.findOne({ sid: request.user.sid });

        if (!messData) {
            const newMessData = new Mess({
                sid: request.user.sid,
                messOffDates: [{dateOfLeaving, dateOfReturn, reason, lastMeal, firstMeal}],
            });
            await newMessData.save();
        } else {
            messData.messOffDates.push({ dateOfLeaving, dateOfLeaving, reason,lastMeal, firstMeal });
            await messData.save();
        }

        response.status(200).json({ message: "Mess off dates added successfully!" });
    } catch (error) {
        console.error("Error marking mess off:", error);
        response.status(500).send("Error marking mess off.");
    }
};
