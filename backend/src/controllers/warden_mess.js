import Event from '../models/messEvents.model.js';
import User from '../models/users.model.js';
import {add_notif} from "../controllers/notifsControllers.js";
import {standardise} from "../controllers/convert in title form.js";


const BATCH_SIZE = 100;  // to send notifs to all students but batch wise

export const getEvents = async (request, response) => {
    try {
        if (request.user.role !== "warden") {
            return response.status(403).json({ message: "Access denied" });
        }

        const events = await Event.find().sort({ date: 1 });
        response.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        response.status(500).send("An error occurred while fetching events.");
    }
};

export const createEvent = async (request, response) => {
    try {
        if (request.user.role !== "warden") {
            return response.status(403).json({ message: "Access denied" });
        }

        const { title, description, date } = request.body;

        if (!title || !description || !date) {
            return response.status(400).json({ error: "All fields are required" });
        }

        const newEvent = new Event({
            title,
            description,
            date,
        });

        await newEvent.save();

    //notif
    const eventTitle = standardise(title).trim();
    const titlE = "New Event";
    const mssg = `An event titled "${eventTitle}" has been created.`;

    //Fetch all students from the database bcaz want to notify all the users regarding mess events
    //const students = await User.find();

    // Paginate and send notifications in batches
        let page = 0;
        let moreStudents = true;

        while(moreStudents){
            const batch = await User.find()
                .skip(page * BATCH_SIZE)
                .limit(BATCH_SIZE);

            if (batch.length < BATCH_SIZE) {
                moreStudents = false;
            }

             // Send notifications to this batch
             const notificationPromises = batch.map(student => {  const sid = student.sid;
                return add_notif(sid,titlE,'mess_event', mssg);
            });

            await Promise.all(notificationPromises);  // Wait for batch to complete and to send notifs to all the students in current batch parallely
            page++;
        }

        response.status(201).json({ message: "Event created successfully", newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        response.status(500).send("An error occurred while creating the event.");
    }
};

export const updateEvent = async (request, response) => {
    try {
        if (request.user.role !== "warden") {
            return response.status(403).json({ message: "Access denied" });
        }

        const { id } = request.params;
        const { title, description, date } = request.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { title, description, date },
            { new: true }
        );

        if (!updatedEvent) {
            return response.status(404).json({ error: "Event not found" });
        }

        response.status(200).json({ message: "Event updated successfully", updatedEvent });
    } catch (error) {
        console.error("Error updating event:", error);
        response.status(500).send("An error occurred while updating the event.");
    }
};

export const deleteEvent = async (request, response) => {
    try {
        if (request.user.role !== "warden") {
            return response.status(403).json({ message: "Access denied" });
        }

        const { id } = request.params;

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return response.status(404).json({ error: "Event not found" });
        }

        response.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        response.status(500).send("An error occurred while deleting the event.");
    }
};
