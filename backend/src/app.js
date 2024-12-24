import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import User from './models/users.model.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import longLeavesRoutes from './routes/longLeavesRoutes.js';
import wardenLeavesRoutes from './routes/wardenLeaves.js'
dotenv.config();

console.log("MONGO URI: ", process.env.MONGO_URI);
const app = express();

//middleware to parse json from requests i think
app.use(express.json());

//middleware to enable cors
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/leaves", longLeavesRoutes);
app.use("/api/warden", wardenLeavesRoutes);



//start listening
app.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});