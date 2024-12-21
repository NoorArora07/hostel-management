import mongoose, { mongo } from "mongoose";

const detailSchema = new mongoose.Schema(
    {
        sid: {
            type: Number,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        parentsNumber: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("UsersData", detailSchema);