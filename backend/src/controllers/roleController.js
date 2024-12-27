import dotenv from 'dotenv';
import { request, response } from 'express';
import mongoose from 'mongoose';
dotenv.config();

export const checkRole = async (request, response) => {
    const role = request.user.role;
    if (role !== "warden") {
        response.json({"message": "access denied!"});
    }
    else
        response.json({"message": "all okay"});
}