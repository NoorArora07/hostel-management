import dotenv from 'dotenv';
import { request, response } from 'express';
import lateLeavesInfo from '../models/lateLeaves.model.js';
import { lateLeave } from '../models/lateLeaves.model.js';
import mongoose from 'mongoose';
dotenv.config();


export const viewRecent = async (request, response) => {
    try {
        const filter = request.params.filter;
        console.log(filter);
        updateCriticalLeaves();
        let recentLeaves;
        if (filter !== "all") {
            recentLeaves = await lateLeavesInfo.aggregate([
                { $unwind: "$lateLeaves" }, {
                    $match: {
                        "lateLeaves.status" : filter,
                        "lateLeaves.approved" : "pending"
                    },
                },
                { $sort: { "lateLeaves.createdAt": -1 } }
            ])
        }
        else {
            recentLeaves = await lateLeavesInfo.aggregate([
                { $unwind: "$lateLeaves" }, {
                    $match: {
                        "lateLeaves.approved" : "pending"
                    },
                },
                { $sort: { "lateLeaves.createdAt": -1 } }
            ])
        }
        console.log(recentLeaves);
        response.json(recentLeaves);

    } catch (error) {
        console.log("There has been an error while fetching responses for the warden!", error);
        response.status(500).send(error);
    }
}

async function updateCriticalLeaves() {
    const today = new Date();
    const todaysDate = (today).toISOString().split('T')[0];
    console.log(todaysDate);

    //update karna hai
    try {
        const result = await lateLeavesInfo.updateMany(
            {
                'lateLeaves.date': todaysDate,
                'lateLeaves.status': 'not-critical'
            },
            {
                $set: {
                    'lateLeaves.$[elem].status': 'critical'
                }
            },
            {
                arrayFilters: [
                    { 'elem.date': todaysDate, 'elem.status': 'not-critical' }
                ]
            }
        );
        console.log("updated and donesies");
        
    } catch (error) {
        console.log("There has been an error while checking applications which may be critical today!", error);
        // response.status(500).send(error);
    }
}

export const approveApplication = async(request, response) => {
    const sid = request.body.sid;
    const object_id = request.body.object_id;
    console.log(`sid: ${sid} and object_id: ${object_id}`);
    try {
        // console.log("first line")
        const objectId = new mongoose.Types.ObjectId(object_id);
        const result = await lateLeavesInfo.updateOne(
            {
                sid: sid,
                'lateLeaves._id': objectId
            },
            {
                $set: { 'lateLeaves.$.approved': "true" }
            }
        )
        response.send('Leave application approved successfully');
        
    } catch (error) {
        console.log("There has been an error while approving an application!", error);
        response.status(500).send(error);
    }
}

export const disapproveApplication = async (request, response) => {
    const sid = request.body.sid;
    const object_id = request.body.object_id;
    console.log(`sid: ${sid} and object_id: ${object_id}`);
    try {

        const objectId = new mongoose.Types.ObjectId(object_id)
        const result = await lateLeavesInfo.updateOne(
            { 
                sid: sid,
                'lateLeaves._id': objectId
            },
            {
                $set: { 'lateLeaves.$.approved': "false" }
            }
        );
        response.send('Leave application disapproved successfully');

    } catch (error) {
        console.log("There has been an error while disapproving an application!", error);
        response.status(500).send(error);
    }
}