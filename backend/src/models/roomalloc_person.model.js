import mongoose from "mongoose";

const details = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        sid: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true
        }
    }
)

const personModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sid: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    roomSelected: {
        type: String, //true, false, pending
        required: true
    },
    allowWaitingList: {
        type: Boolean,
        required: true
    },
    roomNumber: {
        type: String,
        required: false
    }
})

const roomModel = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    numberOfOccupants: {
        type: Number,
        required: true //default ==> 0
    },
    floorNumber: {
        type: String,
        required: true
    },
    occupantsDetails: {
        type: [details],
        required: false
    },
    allowWaitingList: {
        type: Boolean,
        required: true //user se legaaaa
    },
    waitingList: {
        type: [details],
        required: false
    },
})

export const person = mongoose.model("roomallocationpeople", personModel);
export const room = mongoose.model("roomallocationroom", roomModel);