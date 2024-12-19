import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';

dotenv.config();

const app = express();
app.get('/', (request, response) => {
    console.log("server is working!");
    response.send("just a basic response onto the home page hosted locally :)");
})


app.listen(5090);