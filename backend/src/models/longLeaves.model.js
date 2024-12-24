import mongoose from "mongoose";

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
        },
        approved: {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true
    }
)

export const longLeave = mongoose.model("LongLeaveApplication", longLeaveApplication);

const longLeaveSchema = mongoose.Schema(
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
        longLeaves: {
            type: [longLeaveApplication],
            required: false
        },
    }, {
        timestamps: true //createdAt, updatedAt
    }
)
export default mongoose.model("LongLeave", longLeaveSchema);