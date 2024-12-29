import dotenv from 'dotenv';
import { person } from '../models/roomalloc_person.model.js';
import { room } from '../models/roomalloc_person.model.js';
import UserDetail from '../models/userDetail.model.js';

dotenv.config();

export const selectRoom = async (request, response) => {
    //abhi ke liye dekho bhai kya hai status
    
    const numberOfOccupants = request.numberOfOccupants;
    if (numberOfOccupants == 0) {
        selectEmpty(request, response);
    }
    else if (numberOfOccupants == 1) {
        selectAnother(request, response);
    }
    else {
        request.json({"selected": false});
    }
}

//kaafi kuch
const selectEmpty = async (request, response) => {
    //ek empty room ko select karna hai

    //request -> {roomNumber, allowWaitingList}
    const roomNo = request.roomNumber;
    const allowWaitingList = request.allowWaitingList;
    const sid = request.user.sid;
    const name = request.user.name;
    
    try {
        const userDetails = await userDetails.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }

        const branch = userDetails.branch;
        
        let data = new person({
            name: name,
            sid: sid,
            branch: branch,
            roomSelected: "true",
            allowWaitingList: allowWaitingList,
            roomNumber: roomNo
        })

        if (allowWaitingList) {
            data.waitingList = [];
        }

        const result = await data.save();
        console.log(result);
        if (result.acknowledged)
            console.log("hurray");
        
        response.send(200).json({
           "selected": true
        }) //temporary response, this could change aage jaake


    } catch (error) {
        console.log("Error while trying to select an empty room!");
        response.status(500).send("error while selecting an empty room", error);

    }
}

const selectAnother = async (request, response) => {
    //logic to select another room
}