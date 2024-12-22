import dotenv from 'dotenv';
import { request, response } from 'express';
import longLeaveInfo from '../models/longLeaves.model.js';
import longLeave from '../models/longLeaveApplication.model.js'
import User from '../models/users.model.js';
import UserDetail from '../models/userDetail.model.js';
dotenv.config();

export const sendLongLeave = async (request, response) => {
    //request.body has longLeave
    //temporarily assuming the sid will be visible through the link

    try {
        const data = new longLeave({
            dateOfLeaving: request.body.dateOfLeaving,
            dateOfReturn: request.body.dateOfReturn,
            address: request.body.address,
            reason: request.body.reason,
            approved: false
        });
        // const data1save = await data.save();
        const userExists = await longLeaveInfo.findOne({
            sid: request.params.sid
        })

        if (userExists) {
            const result = await longLeaveInfo.updateOne(
                {
                    sid: request.params.sid,
                },
                { 
                    $push: { longLeaves: data } 
                }
            )
            response.status(200).send("long leave application added successfully!!");
        }
        else {
            //add this new user 
            const user1 = await User.findOne({
                sid: request.params.sid
            })
            
            if (!user1) {
                console.log("Error! No such user exists!");
                return response.status(400).send("Error! No such user exists!");
            }
            
            const user2 = await UserDetail.findOne({
                sid: request.params.sid
            })
            
            const arr = [data];
            let addLLinfo = new longLeaveInfo({
                name: user1.name,
                sid: request.params.sid,
                branch: user2.branch,
                longLeaves: arr,
            })

            let result = await addLLinfo.save();

            response.status(201).json({
                message: "Successfully added!",
                sid: result.sid
            })
        }


    }
    catch (error) {
        console.log("Error while making the long leave page:", error);
        response.status(500).send("An error occured while making a long leave");
    }
}

export const viewPendingLongLeaves = async (request, response) => {

    try {
        const result = await longLeaveInfo.findOne({ sid: request.params.sid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const pendingLeaves = (result.longLeaves).filter(leave => leave.approved == false);
        response.status(200).json({
            message: "Pending long leaves fetched successfully!",
            pendingLeaves
        });
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}

export const viewAcceptedLongLeaves = async (request, response) => {

    try {
        const result = await longLeaveInfo.findOne({ sid: request.params.sid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const approvedLeaves = result.longLeaves.filter(leave => leave.approved == true);
        response.status(200).json({
            message: "approved long leaves fetched successfully!",
            approvedLeaves
        });
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}