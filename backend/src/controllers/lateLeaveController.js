import dotenv from 'dotenv';
import { request, response } from 'express';
import lateLeavesInfo from '../models/lateLeaves.model.js';
import { lateLeave } from '../models/lateLeaves.model.js';
import UserDetail from '../models/userDetail.model.js';
dotenv.config();

export const sendLateLeave = async (request, response) => {
    const usersid = request.user.sid;
    const requestdata = request.body;

    const today = new Date();
    const todaysDate = (today).toISOString().split('T')[0];
    console.log(todaysDate);

    const date = requestdata.critical === "critical" ? todaysDate : requestdata.date;
    
    try {
        const data = new lateLeave({
            date: date,
            address: requestdata.address,
            reason: requestdata.reason,
            roomNumber: requestdata.roomNumber,
            critical: requestdata.critical,
            approved: "pending"
        });
        
        const userExists = await lateLeavesInfo.findOne({
            sid: usersid
        })

        if (userExists) {
            console.log(userExists);
            //check if the limit for this semester has been exceeded or na
            if (userExists.lateLeaves.length === 6) {
                console.log("Too many late leaves for this semester!");
                return response.json({
                    "sent": false,
                    "reason": "Too many late leaves sent for this semester!"
                })
            }
            
            //check if the limit for this month has been exceeded or na
            const month = (date.split('-')[1]);
            let leavesMonth = 0;
            userExists.lateLeaves.forEach(leave => {
                let currMonth = (leave.date.split('-'))[1];
                if (currMonth === month)
                    leavesMonth++;
            });

            if (leavesMonth >= 2) {
                console.log("Too many late leaves for this month!");
                return response.json({
                    "sent": false,
                    "reason": "Too many late leaves sent for this month!"
                })
            }

            const result = await lateLeavesInfo.updateOne(
                {
                    sid: usersid,
                },
                { 
                    $push: { lateLeaves: data } 
                }
            )

            console.log(result);
            response.status(200).json({
                sid: usersid,
                object_id: data._id.toString()
            });
        }
        else {        
            const user2 = await UserDetail.findOne({
                sid: usersid
            })
            
            const arr = [data];
            let addLLinfo = new lateLeavesInfo({
                name: request.user.name,
                sid: usersid,
                branch: user2.branch,
                lateLeaves: arr,
            })

            let result = await addLLinfo.save();

            response.status(200).json({
                sid: usersid,
                object_id: data._id.toString()
            });
        }

    } catch (error) {
        console.log(error);
        response.status(500).send("there has been an error while submitting late leave!");
    }
}


export const viewPendingLateLeaves = async (request, response) => {
    const usersid = request.user.sid;
    console.log(usersid);

    try {
        const result = await lateLeavesInfo.findOne({ sid: usersid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const pendingLeaves = (result.lateLeaves).filter(leave => leave.approved == "pending");
        response.status(200).send(pendingLeaves);
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}

export const viewAcceptedLateLeaves = async (request, response) => {
    const usersid = request.user.sid;
    console.log(usersid);

    try {
        const result = await lateLeaveInfo.findOne({ sid: usersid });

        if (!result) {
            console.log("Error! No such user exists!");
            return response.status(400).send("Error! No such user exists!");
        }

        const approvedLeaves = result.lateLeaves.filter(leave => leave.approved == "true");
        response.status(200).send(approvedLeaves);
    }
    catch (error) {
        console.log("Error while fetching pending long leaves:", error);
        response.status(500).send("An error occurred while fetching pending long leaves.");
    }
}