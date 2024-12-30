import dotenv from 'dotenv';
import { person } from '../models/roomalloc_person.model.js';
import { room } from '../models/roomalloc_person.model.js';
import UserDetail from '../models/userDetail.model.js';

dotenv.config();

export const updateRoom = async (request, response) => {

    const numberOfOccupants = request.body.numberOfOccupants;
    if (numberOfOccupants == 0) {
        updateEmpty(request, response);
    }
    else if (numberOfOccupants == 1) {
        updateAnother(request, response);
    }
    else {
        request.json({"selected": false});
    }
}

const updateEmpty = async (request, response) => {
    const roomNo = request.body.roomNumber;
    try {
        const usersid = request.user.sid;
        const name = request.user.name;

        const userDetails = await UserDetail.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            return response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }

        const branch = userDetails.branch;
        const info = {
            sid: usersid,
            name: name,
            branch: branch
        }

        const result = await room.updateOne({
            roomNumber: roomNo
        }, {
            $set: {
                numberOfOccupants: 1,
                allowWaitingList: request.body.allowWaitingList,
            },
            $push: {
                occupantsDetails: info
            }
        })
    } catch (error) {
        console.log("error while updating an empty room: ", error);
        response.status(200).json({
            sent: false,
            error: error
        })
    }
}

const updateAnother = async (request, response) => {
    const roomNo = request.body.roomNumber;
    const allowWaitingList = request.body.allowWaitingList;

    try {
        const usersid = request.user.sid;
        const name = request.user.name;

        const userDetails = await UserDetail.findOne( {sid: sid} );
        if (!userDetails) {
            console.log("no such user exists tf lmaoo");
            return response.status(500).send("trying to find a room for a user that doesn't exist o_O O_o");
        }

        const branch = userDetails.branch;
        const info = {
            sid: usersid,
            name: name,
            branch: branch
        }

        if (allowWaitingList) {
            const result = await room.updateOne({
                roomNumber: roomNo
            }, {
                $push: {
                    waitingList: info
                }
            })
        } else {
            const result = await room.updateOne({
                roomNumber: roomNo
            }, {
                $set: {
                    numberOfOccupants: 2,
                    allowWaitingList: false
                },
                $push: {
                    occupantsDetails: info
                }
            })
        }

    } catch (error) {
        console.log("error while updating an occupied room: ", error);
        response.status(200).json({
            sent: false,
            error: error
        })
    }
}