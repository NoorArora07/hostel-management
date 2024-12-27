import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import User from './models/users.model.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import longLeavesRoutes from './routes/longLeavesRoutes.js';
import wardenLeavesRoutes from './routes/wardenLeaves.js'
import messRoutes from './routes/messRoutes.js';
import messpaymentRoutes from './routes/messpaymentRoutes.js';
import wardenMessRoutes from './routes/wardenMessRoutes.js';
import wardenLongLeavesRoutes from './routes/wardenLeaves.js'
import lateLeavesRouters from './routes/lateLeavesRoutes.js'
import wardenLateLeaveRouters from './routes/wardenLateLeaves.js'
import profileRoutes from './routes/profRoutes.js';


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
app.use("/api/mess", messRoutes);
app.use("/api/payments", messpaymentRoutes);
app.use("/api/mess-warden", wardenMessRoutes);
app.use("/api/leaves/long-leaves", longLeavesRoutes);
app.use("/api/leaves/late-leaves", lateLeavesRouters);
app.use("/api/warden/long-leaves", wardenLongLeavesRoutes);
app.use("/api/warden/late-leaves", wardenLateLeaveRouters);
app.use("/api/profile", profileRoutes);

//start listening
app.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});