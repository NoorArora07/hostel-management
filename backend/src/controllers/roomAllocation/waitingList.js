import dotenv from 'dotenv';
import { person } from '../../models/roomalloc_person.model.js';
import { room } from '../../models/roomalloc_person.model.js';
import { add_notif } from '../notifsControllers.js';
import UserDetail from '../../models/userDetail.model.js';

dotenv.config();

export const viewWaitingList = async (request, response) => {
    const usersid = request.user.sid;
    const name = request.user.name;

    try {
        const personDetails = await person.findOne({
            sid: usersid
        });

        const roomNumber = personDetails.roomNumber;

        const roomDetails = await room.findOne({
            roomNumber: roomNumber
        });

        const waitingList = roomDetails.waitingList;

        response.status(200).json({
            waitingList: waitingList,
            roomNumber: roomNumber
        })

    } catch (error) {
        console.log("error while viewing the waiting list for this user!", error);
        return response.status(500).send("error while viewing the waiting list!");
    }
}

export const declineInWaitingList = async (request, response) => {
    const usersid = request.user.sid;
    const name = request.user.name;

    const roomNumber = request.body.roomNumber;
    const declinesid = request.body.sid;

    /*
    {
        "roomNumber": ------
        "sid": --------
    }
    */

    try {
        const result = await room.updateOne(
            { 
                roomNumber: roomNumber,
                "waitingList.sid": declinesid
            },
            { 
                $pull: { "waitingList": { sid: declinesid} } 
            }
        );

        const updatePerson = await person.updateOne({
            sid: declinesid
        }, {
            $set: {
                roomSelected: "false",
                roomNumber: 0
            }
        });

        //notif
        const title = "Removed from Waiting List";
        const message = `You have been removed from the waiting list for room number ${roomNumber}.`
        //  Your status has now been updated from "pending" to "false". `
        add_notif(declinesid,title ,"rooM",message);

        return response.status(200).json({
            "updated": true
        })
        
    } catch (error) {
        console.log("error while declining something in the waiting list! ", error);
        return response.status(500).send("error while decling something in the waiting list!");
    }
}

export const acceptInWaitingList = async (request, response) => {
    //multiple things
    
    //step 1 -> change room status
    //step 2 -> decline all others and change their status
    
    const usersid = request.user.sid;
    const name = request.user.name;
    
    const roomNumber = request.body.roomNumber;
    const info = request.body.info;
    console.log(info);
    
    /*
    {
        "roomNumber":
        "info": {
            "name": ____
            "sid": ____
            "branch": ____
        }
    } 
            
    */
    try {
        const updatePerson = await person.updateOne({
            sid: info.sid
        }, {
            $set: {
                roomSelected: "true",
                roomNumber: roomNumber
            }
        });

        const updateRoom = await room.updateOne({ roomNumber: roomNumber }, 
        {
            $set: {
                numberOfOccupants: 2,
                acceptInWaitingList: false,
            },
            $push: {
                occupantsDetails: info
            },
            $pull: {
                "waitingList": {sid: info.sid}
            }
        })
        
        const roomDetails = await room.findOne({roomNumber: roomNumber});
        const waitingList = roomDetails.waitingList;
        
        const updateRoom2 = await room.updateOne({roomNumber: roomNumber}, {
            $set: {
                waitingList: []
            }
        }
    )
    
    for (const infos of waitingList) {
        console.log(infos.sid);
        const updatePerson = await person.updateOne({
            sid: infos.sid
        }, {
            $set: {
                roomSelected: "false"
            }
        });
        
        const title = "Removed from Waiting List";
        const message = `You have been removed from the waiting list for room number ${roomNumber}.`
        //  Your status has now been updated from "pending" to "false". `
        add_notif(infos.sid,title ,"rooM",message);
    }
        //notif
        const title = "Room Allotted";
        const message = `You have been allotted room number ${roomNumber}.`
        add_notif(info.sid,title ,"rooM",message);
    
        return response.status(200).json({
            "updated": true
        })
    } catch (error) {
        console.log("this is some error while accepting a user in the waiting list!", error);
        return response.status(500).send("there has been an error while accepting a user in the waiting list!");
    }
}

export const leaveWaitingList = async (request, response) => {
    const usersid = request.user.sid;
    const name = request.user.name;

    try {
        const personDetails = await person.findOne({sid: usersid})

        if (!personDetails) {
            return response.status(200).json({"left": false});
        }

        const roomNumber = personDetails.roomNumber;
        const info = {
            sid: usersid,
            name: name,
            branch: personDetails.branch
        }


        const updatePerson = await person.updateOne({sid: usersid}, {
            $set: {
                roomSelected: "false",
                roomNumber: 0
            },
        })

        const updateRoom = await room.updateOne({roomNumber: roomNumber}, {
            $pull: {
                waitingList: {sid: usersid}
            }
        });

        return response.status(200).json({
            "left": true,
            "sid":usersid
        })

    } catch (error) {

    }
}

