import express from 'express';
import http from 'http';
import { Server } from "socket.io"

import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import longLeavesRoutes from './routes/longLeavesRoutes.js';
import wardenLeavesRoutes from './routes/wardenLeaves.js'
import messRoutes from './routes/messRoutes.js';
import messpaymentRoutes from './routes/messpaymentRoutes.js';
import complaintsRoutes from './routes/complaintsRoutes.js';
import wardenMessRoutes from './routes/wardenMessRoutes.js';
import warden_complaintsRoutes from './routes/warden_complaintsRoutes.js';
import wardenLongLeavesRoutes from './routes/wardenLeaves.js'
import lateLeavesRouters from './routes/lateLeavesRoutes.js'
import wardenLateLeaveRouters from './routes/wardenLateLeaves.js'
import profileRoutes from './routes/profRoutes.js';
import roomAllocationRoutes from './routes/roomAllocRoutes.js'
import notifsRoutes from './routes/notifsRoutes.js';

import roleRoutes from './routes/roleRoutes.js';

dotenv.config();
console.log("MONGO URI: ", process.env.MONGO_URI);


const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
app.use("/api/complaint",complaintsRoutes);
app.use("/api/warden-complaint",warden_complaintsRoutes);
app.use("/api/mess-warden", wardenMessRoutes);
app.use("/api/leaves/long-leaves", longLeavesRoutes);
app.use("/api/leaves/late-leaves", lateLeavesRouters);
app.use("/api/warden/long-leaves", wardenLongLeavesRoutes);
app.use("/api/warden/late-leaves", wardenLateLeaveRouters);
app.use("/api/profile", profileRoutes);
app.use("/api/check", roleRoutes);
app.use("/api/room-allocation", roomAllocationRoutes);
app.use("/api/notif",notifsRoutes);

//start listening
server.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});