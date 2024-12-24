import dotenv from 'dotenv';
import { request, response } from 'express';
import longLeaveInfo from '../models/longLeaves.model.js';
import { longLeave } from '../models/longLeaves.model.js';
import UserDetail from '../models/userDetail.model.js';
dotenv.config();


export const viewRecent = async (request, response) => {
    try {
        const {time} = request.body

        let startDate = getStartDate(time);

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
        response.json(recentLeaves)
    } catch (error) {
        console.log("There has been an error while fetching responses for the warden!");
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