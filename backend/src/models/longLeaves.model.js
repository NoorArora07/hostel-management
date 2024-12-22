import mongoose from "mongoose";

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
            type: Array,
            required: false
        },
    }
)
export default mongoose.model("LongLeave", longLeaveSchema);