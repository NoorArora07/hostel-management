import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// console.log("MONGO URI: ", process.env.MONGO_URI);
export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`Error in connecting: ${error}`);
        process.exit(1);
    }
}