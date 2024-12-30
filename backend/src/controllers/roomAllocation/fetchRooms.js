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