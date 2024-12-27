import Mess from '../models/mess.model.js';
import Event from '../models/messEvents.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const getEvents = async (request, response) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        response.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        response.status(500).send("An error occurred while fetching events.");
    }
};

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


export const getMessLeaveDetails = async (req, res) => {
    try {
        const messData = await Mess.findOne({ sid: req.user.sid });

        if (!messData) {
            return res.status(404).json({ message: 'No mess leave data found.' });
        }

        const messOffDates = messData.messOffDates.map(leave => {
            const { dateOfLeaving, dateOfReturn, reason, lastMeal, firstMeal } = leave;

            // Calculate the total number of leave days
            // const startDate = new Date(dateOfLeaving);
            // const endDate = new Date(dateOfReturn);
            // const leaveDuration = (endDate - startDate) / (1000 * 3600 * 24); // Difference in days

            return {
                dateOfLeaving,
                dateOfReturn,
                reason,
                lastMeal,
                firstMeal
                //leaveDuration
            };
        });

        //const totalLeaveDays = messOffDates.reduce((sum, leave) => sum + leave.leaveDuration, 0);
        console.log("successful");
        res.status(200).json({
            messOffDates,
            //totalLeaveDays
        });
    } catch (error) {
        console.error("Error fetching mess leave details:", error);
        res.status(500).json({ error: "An error occurred while fetching leave details." });
    }
};

