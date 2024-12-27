import Event from '../models/messEvents.model.js';

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
