import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import User from './models/users.model.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

//middleware to parse json from requests i think
app.use(express.json());

//middleware to enable cors
app.use(cors(
    {
        origin: 'http://localhost:5173/' // Allow requests from frontend
    }
));

//routes
app.use("/api/auth", authRoutes);


//start listening
app.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});