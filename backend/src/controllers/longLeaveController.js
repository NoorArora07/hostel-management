import dotenv from 'dotenv';
import { request, response } from 'express';
import longLeaveInfo from '../models/longLeaves.model.js';
import { longLeave } from '../models/longLeaves.model.js';
import UserDetail from '../models/userDetail.model.js';
dotenv.config();

export const sendLongLeave = async (request, response) => {
    //request.body has longLeave

    const usersid = request.user.sid;
    console.log(usersid);
    console.log(request.body[0]);

    try {
        const data = new longLeave({
            dateOfLeaving: request.body[0].dateOfLeaving,
            dateOfReturn: request.body[0].dateOfReturn,
            address: request.body[0].address,
            reason: request.body[0].reason,
            roomNumber: request.body[0].roomNumber,
            approved: false
        });
        // const data1save = await data.save();
        const userExists = await longLeaveInfo.findOne({
            sid: usersid
        })

        if (userExists) {
            const result = await longLeaveInfo.updateOne(
                {
                    sid: usersid,
                },
                { 
                    $push: { longLeaves: data } 
                }
            )
            response.status(200).json({
                sid: data.sid,
                object_id: data._id.toString()
            });
        }
        else {
            const user2 = await UserDetail.findOne({
                sid: usersid
            })
            
            const arr = [data];
            let addLLinfo = new longLeaveInfo({
                name: request.user.name,
                sid: usersid,
                branch: user2.branch,
                longLeaves: arr,
            })

            let result = await addLLinfo.save();

            response.status(200).json({
                sid: data.sid,
                object_id: data._id.toString()
            });
        }


    }
    catch (error) {
        console.log("Error while making the long leave page:", error);
        response.status(500).send("An error occured while making a long leave");
    }
}

export const viewPendingLongLeaves = async (request, response) => {
    const usersid = request.user.sid;
    console.log(usersid);

    try {
        const result = await longLeaveInfo.findOne({ sid: usersid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const pendingLeaves = (result.longLeaves).filter(leave => leave.approved == false);
        response.status(200).send(pendingLeaves);
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}

export const viewAcceptedLongLeaves = async (request, response) => {
    const usersid = request.user.sid;
    console.log(usersid);

    try {
        const result = await longLeaveInfo.findOne({ sid: usersid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const approvedLeaves = result.longLeaves.filter(leave => leave.approved == true);
        response.status(200).send(approvedLeaves);
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}