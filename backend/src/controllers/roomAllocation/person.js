import dotenv from 'dotenv';
import { person, room } from '../../models/roomalloc_person.model.js';
import UserDetail from '../../models/userDetail.model.js';

dotenv.config();

export const selectRoomSocket = async (data, callback) => {
    try {
        const usersid = data.sid;
        const find = await person.findOne({ sid: usersid });
        console.log(find);

        if (find && (find.roomSelected === "true" || find.roomSelected === "pending")) {
            return callback({ selected: false, reason: "You have already selected a room!" });
        }

        const numberOfOccupants = data.numberOfOccupants;
        if (numberOfOccupants === 0) {
            return await selectEmptySocket(data, callback);
        } else if (numberOfOccupants === 1) {
            return await selectAnotherSocket(data, callback);
        } else {
            return callback({ selected: false, reason: "This room is full!" });
        }
    } catch (error) {
        console.error("Error in selectRoomSocket:", error);
        callback({ selected: false, reason: "Server error!" });
    }
};

const selectEmptySocket = async (data, callback) => {
    const roomNo = data.roomNumber;
    const allowWaitingList = data.allowWaitingList;
    const sid = data.sid;
    const name = data.name;

    try {
        const userDetails = await UserDetail.findOne({ sid: sid });
        if (!userDetails) {
            console.log("No such user exists.");
            return callback({ selected: false, reason: "User does not exist." });
        }

        const branch = userDetails.branch;
        await upsertPersonRecord({
            sid: sid,
            name: name,
            branch: branch,
            roomNo: roomNo,
            allowWaitingList: allowWaitingList,
            roomSelected: "true"
        });

        return callback({ selected: true });

    } catch (error) {
        console.log("Error while trying to select an empty room!", error);
        return callback({ selected: false, reason: "Error while selecting an empty room." });
    }
};

const selectAnotherSocket = async (data, callback) => {
    const allowWaitingList = data.allowWaitingList;
    const roomNo = data.roomNumber;
    const sid = data.sid;
    const name = data.name;

    let branch;

    try {
        const userDetails = await UserDetail.findOne({ sid: sid });
        if (!userDetails) {
            console.log("No such user exists.");
            return callback({ selected: false, reason: "User does not exist." });
        }

        branch = userDetails.branch;
        const roomSelected = allowWaitingList ? "pending" : "true";

        await upsertPersonRecord({
            sid: sid,
            name: name,
            branch: branch,
            roomNo: roomNo,
            allowWaitingList: allowWaitingList,
            roomSelected: roomSelected,
            numberOfOccupants: data.numberOfOccupants
        });

        return callback({ selected: true });

    } catch (error) {
        console.log("Error while updating a person's record with selectAnother", error);
        return callback({ selected: false, reason: "Error while selecting a room." });
    }
};

const upsertPersonRecord = async ({ sid, name, branch, roomNo, allowWaitingList, roomSelected, numberOfOccupants }) => {
    try {
        const result = await person.findOneAndUpdate(
            { sid: sid },
            {
                $set: {
                    name,
                    branch,
                    roomNumber: roomNo,
                    roomSelected,
                    allowWaitingList: numberOfOccupants === 0 ? allowWaitingList : "false"
                }
            },
            {
                upsert: true, // Create new document if not exists
                new: true // Return the updated document
            }
        );

        console.log("Person record upserted successfully:", result);
        return result;
    } catch (error) {
        console.error("Error in upsertPersonRecord:", error);
        throw error;
    }
};