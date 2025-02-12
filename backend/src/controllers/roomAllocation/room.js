import dotenv from 'dotenv';
import { person } from '../../models/roomalloc_person.model.js';
import { room } from '../../models/roomalloc_person.model.js';
import {add_notif} from '../notifsControllers.js';
import UserDetail from '../../models/userDetail.model.js';
dotenv.config();

export const updateRoomSocket = async (data, callback) => {
    try {
        const usersid = data.sid; // Get user SID from socket data
        const roomNumber = data.roomNumber
        const findPerson = await person.findOne({ sid: usersid });
        const findRoom = await room.findOne({roomNumber: roomNumber});

        console.log(`${findRoom.numberOfOccupants} and ${data.numberOfOccupants}`);
        if (findRoom.numberOfOccupants != data.numberOfOccupants) {
            return callback({ selected: false, reason: "Somebody else picked that room before you!"});
        }

        if (findPerson && (findPerson.roomSelected === "true" || findPerson.roomSelected === "pending")) {
            return callback({ selected: false, reason: "You have already selected a room!" });
        }

        const numberOfOccupants = data.numberOfOccupants;
        if (numberOfOccupants === 0) {
            return await updateEmptySocket(data, callback);
        } else if (numberOfOccupants === 1) {
            return await updateAnotherSocket(data, callback);
        } else {
            return callback({ selected: false });
        }
    } catch (error) {
        console.log("Error in updateRoomSocket:", error);
        callback({ selected: false, error: error.message });
    }
};

const updateEmptySocket = async (data, callback) => {
    try {
        const { sid, name, roomNumber, allowWaitingList } = data;
        const userDetails = await UserDetail.findOne({ sid: sid });

        if (!userDetails) {
            console.log("No such user exists.");
            return callback({ selected: false, error: "User does not exist!" });
        }

        const info = {
            sid,
            name,
            branch: userDetails.branch,
        };

        const result = await room.updateOne(
            { roomNumber: roomNumber },
            {
                $set: {
                    numberOfOccupants: 1,
                    allowWaitingList: allowWaitingList,
                },
                $push: {
                    occupantsDetails: info,
                },
            }
        );

        //notif
        const title = "Room Allotted";
        const message = `You have been allotted room number ${roomNumber}`;
        add_notif(sid,title ,"rooM", message);

        callback({ selected: true, updatedRoom: result });
    } catch (error) {
        console.log("Error while updating empty room:", error);
        callback({ selected: false, error: error.message });
    }
};

const updateAnotherSocket = async (data, callback) => {
    try {
        const { sid, name, roomNumber, allowWaitingList } = data;
        const userDetails = await UserDetail.findOne({ sid: sid });

        if (!userDetails) {
            console.log("No such user exists.");
            return callback({ selected: false, error: "User does not exist!" });
        }

        const info = {
            sid,
            name,
            branch: userDetails.branch,
        };

        if (allowWaitingList) {
            await room.updateOne(
                { roomNumber: roomNumber },
                {
                    $push: { waitingList: info },
                }
            );

            const findRoom = await room.findOne({roomNumber: roomNumber});
            const occupantSid = findRoom.occupantsDetails[0].sid;
            console.log(occupantSid)
            const title1 = "Somebody Entered Your Waiting List";
            const message1 = `${name} has entered the waiting list for your room ${roomNumber}.`;
            add_notif(occupantSid,title1,"rooM",message1);
            
            //notif
            const title = "Entered Waiting List";
            const message = `You have entered the waiting list for room number ${roomNumber}.`;
            add_notif(sid,title,"rooM",message);

        } else {
            await room.updateOne(
                { roomNumber: roomNumber },
                {
                    $set: {
                        numberOfOccupants: 2,
                        allowWaitingList: false,
                    },
                    $push: {
                        occupantsDetails: info,
                    },
                }
            );
            
            //notif
            const title = "Room Allotted";
            const message = `You have been allotted room number ${roomNumber}.`;
            add_notif(sid,title,"rooM",message);
        }

        callback({ selected: true });
    } catch (error) {
        console.log("Error while updating occupied room:", error);
        callback({ selected: false, error: error.message });
    }
};

export const makeRoom = async (request, response) => {
    try {
        for (let floorNumber = 1; floorNumber <= 3; floorNumber++) {
            for (let roomNumber = floorNumber * 100 + 1; roomNumber <= floorNumber * 100 + 24; roomNumber++) {
                const newRoom = new room({
                    roomNumber: roomNumber,
                    numberOfOccupants: 0,
                    floorNumber: floorNumber,
                    occupantsDetails: [],
                    allowWaitingList: false,
                    waitingList: []
                })

                const result = await newRoom.save();
            }
        }
        console.log("saved successfully!");
        return response.status(200).json({
            selected:true
        })
        }  catch(error) {
        console.log("error while making a room", error);
        response.status(500).send("error while making a room!");
    }
}
