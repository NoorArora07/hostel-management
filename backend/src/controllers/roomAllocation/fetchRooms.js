import dotenv from 'dotenv';
import { person, room } from '../../models/roomalloc_person.model.js';
import UserDetail from '../../models/userDetail.model.js';

dotenv.config();

export const fetchRooms = async (request, response) => {
    try {
        const floor = request.params.floor;
        
        const result = await room.find({
            floorNumber: floor
        });
        console.log(result);
        
        response.status(200).json({
            "rooms": result
        })
    } catch (error) {
        console.log("error while fetching all the rooms", error);
        return response.status(500).send("error while fetching the rooms");
    }
}

export const viewPartOf = async (request, response) => {
    try {
        const usersid = request.user.sid;
        const roomNumber = request.params.roomNumber;

        const personDetails = await person.findOne({sid: usersid});
        const roomDetails = await room.findOne({roomNumber: roomNumber});

        if (personDetails.roomNumber === roomNumber) {
            if (personDetails.roomSelected === "pending")
                return response.status(200).json({"occupant": false, "allowWaitingList": true, "inWaitingList": true});
            else if (roomDetails.allowWaitingList === true)
                return response.status(200).json({"occupant": true, "allowWaitingList": true, "inWaitingList": false});
            else
                return response.status(200).json({"occupant": true, "allowWaitingList": false, "inWaitingList": false });
        }
        else
            return response.status(200).json({"occupant": false, "inWaitingList": false })

    } catch (error) {
        console.log("error while trying to view what part you are of the room ", error);
        return response.status(500).send("error while viewing part of the rooms!");
    }
}