import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        sid: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }, {
        timestamps: true //createdAt, updatedAt
    }
);

export default mongoose.model("User", loginSchema);