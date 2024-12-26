import dotenv from 'dotenv';
import { request, response } from 'express';
import longLeaveInfo from '../models/longLeaves.model.js';
import { longLeave } from '../models/longLeaves.model.js';
import UserDetail from '../models/userDetail.model.js';
import mongoose from 'mongoose';
dotenv.config();


export const viewRecent = async (request, response) => {
    try {
        const time = request.params.time;
        console.log(time);
        let startDate = getStartDate(time);
        console.log(startDate);
        //yaha se date lagayenge
        let recentLeaves = await longLeaveInfo.aggregate([
            { $unwind: "$longLeaves" }, {
                $match: {
                    "longLeaves.createdAt" : {$gte : startDate},
                    "longLeaves.approved" : false
                },
            },
            { $sort: { "longLeaves.createdAt": -1 } }
        ])
        console.log(recentLeaves);
        response.json(recentLeaves)
    } catch (error) {
        console.log("There has been an error while fetching responses for the warden!");
        response.status(500).send(error);
    }
}

export const approveApplication = async(request, response) => {
    const sid = request.body.sid;
    const object_id = request.body.object_id;
    console.log(`sid: ${sid} and object_id: ${object_id}`);
    try {
        // console.log("first line")
        const objectId = new mongoose.Types.ObjectId(object_id);
        const result = await longLeaveInfo.updateOne(
            {
                sid: sid,
                'longLeaves._id': objectId
            },
            {
                $set: { 'longLeaves.$.approved': true }
            }
        )
        // console.log("here here");
        if (result.matchedCount === 0) {
            return response.status(404).send('Leave application not found while approving');
        }
        
        if (result.modifiedCount === 0) {
            return response.status(400).send('Leave application was already approved or no changes were made');
        }
        
        response.send('Leave application approved successfully');
        
    } catch (error) {
        console.log("There has been an error while approving an application!", error);
        response.status(500).send(error);
    }
}

export const deleteApplication = async (request, response) => {
    const sid = request.body.sid;
    const object_id = request.body.object_id;
    console.log(`sid: ${sid} and object_id: ${object_id}`);
    try {

        const objectId = new mongoose.Types.ObjectId(object_id)
        const result = await longLeaveInfo.updateOne(
            { 
                sid: sid,
                'longLeaves._id': objectId
            },
            { 
                $pull: { "longLeaves": { _id: objectId} } 
            }
        );

        if (result.matchedCount === 0) {
            return response.status(404).send('Leave application not found while approving');
        }
        
        if (result.modifiedCount === 0) {
            return response.status(400).send('Leave application was already approved or no changes were made');
        }

        response.send('Leave application deleted successfully');

    } catch (error) {
        console.log("There has been an error while deleting an application!", error);
        response.status(500).send(error);
    }
}

function getStartDate (time) {
    let startDate = new Date();

    if (time == "1 week") {
        startDate.setDate(startDate.getDate() - 7);
    }
    else if (time == "2 weeks") {
        startDate.setDate(startDate.getDate() - 14);
    }
    else if (time == "3 weeks") {
        startDate.setDate(startDate.getDate() - 21);
    }
    else if (time == "4 weeks") {
        startDate.setDate(startDate.getDate() - 28);
    }

    return startDate;
}