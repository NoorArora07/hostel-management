import Mess from '../models/mess.model.js';
import Event from '../models/messEvents.model.js';
import dotenv from 'dotenv';
import moment from 'moment';

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

export const MessLeaveForm = async (request, response) => {
    try {
        const { dateOfLeaving, dateOfReturn, reason, lastMeal, firstMeal } = request.body;

        if (!dateOfLeaving || !dateOfReturn || !reason|| !lastMeal || !firstMeal)
            return response.status(400).send("All fields are required!");

        const messData = await Mess.findOne({ sid: request.user.sid });

        if (!messData) {
            const newMessData = new Mess({
                name:request.user.name,
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

            return {
                dateOfLeaving,
                dateOfReturn,
                reason,
                lastMeal,
                firstMeal
            };
        });

        console.log("successful");
        res.status(200).json({
            messOffDates,
        });
    } catch (error) {
        console.error("Error fetching mess leave details:", error);
        res.status(500).json({ error: "An error occurred while fetching leave details." });
    }
};

export const rebate = async(sid,month,year)=>{
    try {
        const messData = await Mess.findOne({ sid});
        //console.log(messData);
        if (!messData) {
            console.log("No mess leave data found for SID:", sid);
            return 0;
            //throw new Error('No mess leave data found.');
        }
        //console.log("mess data : ", messData);

        let leaveDays = 0;

        const months = {
            "January": 1,
            "February": 2,
            "March": 3,
            "April": 4,
            "May": 5,
            "June" : 6,
            "July": 7,
            "August" : 8,
            "September": 9,
            "October": 10,
            "November": 11,
            "December": 12,
          }
          

        messData.messOffDates.forEach((leave) => {
            const { dateOfLeaving, dateOfReturn, firstMeal, lastMeal } = leave;

            let currentDate = moment(dateOfLeaving);
            const endDate = moment(dateOfReturn);

           
            const leavingDay = currentDate.isoWeekday(); // 6 = Saturday, 7 = Sunday
            const leavingMonth = currentDate.month() + 1;
            const leavingYear = currentDate.year();

            console.log("date : ",leavingDay," ",leavingMonth," ",leavingYear)

            console.log("date2 : ",typeof(leavingDay)," ",months[month]," ",parseInt(year))

            if ((leavingDay === 6 || leavingDay === 7) &&
                leavingMonth === months[month] &&
                leavingYear === parseInt(year) &&
                lastMeal === "None") {
                leaveDays++; 
            }
            console.log("curr date : ", currentDate);
            currentDate.add(1, 'days');
            console.log("curr date2 : ", currentDate);

            while (currentDate.isBefore(endDate)) {
                const dayOfWeek = currentDate.isoWeekday();
                const currentMonth = currentDate.month() + 1;
                const currentYear = currentDate.year();

                if (
                    (dayOfWeek === 6 || dayOfWeek === 7) &&
                     currentMonth === months[month] &&
                    currentYear === parseInt(year)) {
                     leaveDays++;
                }

                currentDate.add(1, 'days');
            }
            });
            console.log(`Leave days for sid ${sid} = `, leaveDays);
            return (35 * leaveDays);
    } catch (error) {
        console.error("Error calculating monthly leave days:", error);
        throw new Error("An error occurred while calculating monthly leave days.");
    }

};