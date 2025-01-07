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

        const newDetail = new PayDetails({
            month,
            year,
            amount,
        });

        await newDetail.save();

        //adding in student ka database batchwise as soon as warden updates the details
        let page = 0;
        let moreStudents = true;

        while (moreStudents) {
            const batch = await User.find({role:"student"})
                .skip(page * BATCH_SIZE)
                .limit(BATCH_SIZE);

            if (batch.length < BATCH_SIZE) {
                moreStudents = false;
            }

            const detailPromises = batch.map(st => {
                const userId = st.sid;
                const name = st.name;
                const rebate_val = rebate(month, year);
                const amt = amount - rebate_val;

                const title = "Monthly Payment Details";
                const message = "Monthly payment details are out, kindly pay the mess fee before 20th of this month";
                add_notif(userId,title,"mess_payDetails",message);

                return add_details(userId, name, month, year, amount, rebate_val, amt);
            });

            await Promise.all(detailPromises);
            page++;
        }

        response.status(200).json({ message: "Payment details saved and sent to database also." });

    }
    catch (error) {
        console.error("Error adding details:", error);
        res.status(500).send("An error occurred while adding details.");
    }

};