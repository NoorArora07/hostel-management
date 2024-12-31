import dotenv from 'dotenv';
import { person, room } from '../../models/roomalloc_person.model.js';
import UserDetail from '../../models/userDetail.model.js';

dotenv.config();

export const selectRoom = async (request, response) => {
    //abhi ke liye dekho bhai kya hai status
    const usersid = request.user.sid;
    const find = await person.findOne({sid: usersid});
    console.log(find);

    if (find && (find.roomSelected == "true" || find.roomSelected == "pending" ))  {
        return response.json({"selected": false, "reason": "You have already selected a room!"});
    }
    
    const numberOfOccupants = request.body.numberOfOccupants;
    if (numberOfOccupants == 0) {
        return selectEmpty(request, response);
    }
    else if (numberOfOccupants == 1) {
        return selectAnother(request, response);
    }
    else {
        return response.json({"selected": false, "reason": "This room is full!"});
    }
}
//kaafi kuch
const selectEmpty = async (request, response) => {
    //ek empty room ko select karna hai

    //request -> {roomNumber, allowWaitingList}
    const roomNo = request.body.roomNumber;
    const allowWaitingList = request.body.allowWaitingList;
    const sid = request.user.sid;
    const name = request.user.name;
    
    try {
        const userDetails = await UserDetail.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            return response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }

        const branch = userDetails.branch;
        await upsertPersonRecord({
            sid: sid,
            name: name,
            branch: branch,
            roomNo: roomNo,
            allowWaitingList: allowWaitingList,
            roomSelected: "true"
        })

        return response.status(200).json({
           "selected": true
        }) //temporary response, this could change aage jaake


    } catch (error) {
        console.log("Error while trying to select an empty room!", error);
        return response.status(400).send("error while selecting an empty room");

    }
}

const selectAnother = async (request, response) => {
    const allowWaitingList = request.body.allowWaitingList
    const roomNo = request.body.roomNumber;
    const sid = request.user.sid;
    const name = request.user.name;

    let branch;

    try {
        const userDetails = await UserDetail.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            return response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }
        branch = userDetails.branch;
        const roomSelected = allowWaitingList ? "pending" : "true";

        await upsertPersonRecord({
            sid: sid,
            name: name,
            branch: branch,
            roomNo: roomNo,
            allowWaitingList: allowWaitingList,
            roomSelected: roomSelected
        })

        response.status(200).json({"selected": true});

    } catch (error) {
        console.log("error while updating a person's record with selectAnother", error);
        response.status(500).send("error while selectRoom!");
    }
}

const upsertPersonRecord = async ({ sid, name, branch, roomNo, allowWaitingList, roomSelected }) => {
    try {
        const result = await person.findOneAndUpdate(
            { sid: sid },
            {
                $set: {
                    name,
                    branch,
                    roomNumber: roomNo,
                    roomSelected,
                    allowWaitingList,
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
