import Mess from '../models/mess.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const getMessStatus = async (request, response) => {
    try {
        const messData = await Mess.findOne({ sid: request.user.sid });
        if (!messData) return response.status(404).send("No mess data found for the student.");

        response.status(200).json(messData);
    } catch (error) {
        console.error("Error fetching mess status:", error);
        response.status(500).send("An error occurred while fetching mess status.");
    }
};

export const MessLeaveForm = async (request, response) => {
    try {
        const { dateOfLeaving, dateOfReturn, reason, lastMeal, firstMeal } = request.body;

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
            messData.messOffDates.push({ dateOfLeaving, dateOfReturn, reason,lastMeal, firstMeal });
            await messData.save();
        }

        response.status(200).json({ message: "Mess off dates added successfully!" });
    } catch (error) {
        console.error("Error marking mess off:", error);
        response.status(500).send("Error marking mess off.");
    }
};
