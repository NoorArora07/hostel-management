import mongoose from "mongoose";

const lateLeaveApplication = mongoose.Schema( {
        date: {
            type: String,
            required: false
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
        },
        status: {
            type: String,
            required: true
        },
        approved: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
)

export const lateLeave = mongoose.model("lateLeaveApplication", lateLeaveApplication);

const lateLeaveSchema = mongoose.Schema(
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
        },
        lateLeaves: {
            type: [lateLeaveApplication],
            required: false
        },
    }, {
        timestamps: true //createdAt, updatedAt
    }
)
export default mongoose.model("lateLeave", lateLeaveSchema);