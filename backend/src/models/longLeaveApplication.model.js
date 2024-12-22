import mongoose, { mongo } from "mongoose";

const longLeaveApplication = mongoose.Schema( {
        dateOfLeaving: {
            type: String,
            required: true
        },
        dateOfReturn: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        reason: {
            type: String,
            required: true
        },
        roomNumber: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("LongLeaveApplication", longLeaveApplication);