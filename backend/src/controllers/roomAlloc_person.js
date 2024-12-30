import dotenv from 'dotenv';
import { person, room } from '../models/roomalloc_person.model.js';
import UserDetail from '../models/userDetail.model.js';

dotenv.config();

export const selectRoom = async (request, response) => {
    //abhi ke liye dekho bhai kya hai status
    
    const numberOfOccupants = request.body.numberOfOccupants;
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
        const info = {
            sid: sid,
            name: name,
            branch: branch
        }
        
        let data = new person({
            name: name,
            sid: sid,
            branch: branch,
            roomSelected: "true",
            allowWaitingList: allowWaitingList,
            roomNumber: roomNo
        })
        
        const result = await data.save();
        console.log(result);
        if (result.acknowledged)
            console.log("hurray");

        updateRoomDetails(roomNo, allowWaitingList, info);
        
        response.status(200).json({
           "selected": true
        }) //temporary response, this could change aage jaake


    } catch (error) {
        console.log("Error while trying to select an empty room!");
        response.status(500).send("error while selecting an empty room", error);

    }
}

const selectAnother = async (request, response) => {
    const allowWaitingList = request.body.allowWaitingList
    const roomNo = request.body.roomNumber;
    const sid = request.user.sid;
    const name = request.user.name;

    let info;
    let data;
    let branch;

    try {
        const userDetails = await UserDetail.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            return response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }
        branch = userDetails.branch;
        info = {
            sid: sid,
            name: name,
            branch: branch
        }
        
        data = new person({
            name: name,
            sid: sid,
            branch: branch,
            roomSelected: allowWaitingList ? "pending" : "true",
            allowWaitingList: false,
        })
    } catch (error) {
        console.log("there is an error while saving basic details", error);
        response.status(500).send("error while saving basic details", error);
    }

    
    if (!allowWaitingList) {
        try {
            data.roomNumber = roomNo;

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
    else {
        const result = await data.save();
        console.log(result);
        if (result.acknowledged)
            console.log("hurray");
        
        //add to waiting list
        response.send(200).json({
            "selected": true
        }) //temporary response, this could change aage jaake
    }
}