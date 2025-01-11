import {request, response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import UserDetail from '../models/userDetail.model.js';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '../middleware/verifyToken.js';

dotenv.config();

//const JWT_SECRET = process.env.JWT_SECRET;

export const signup1 =  async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const existingSid = await User.findOne({sid: request.body.sid });
        if (existingSid) {
            console.log("A User with this sid already exists!");
            return response.status(400).send("A User with this sid already exists!");
        }

        const existingUser = await User.findOne({ email: request.body.email });
        if (existingUser) {
            console.log("Cannot use the same email more than once!");
            return response.status(400).send("This email is already in use!");
        }

        //const data = new User(request.body);
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const data = new User({
            name: request.body.name, 
            sid : request.body.sid,
            email : request.body.email,
            role : "student",
            password: hashedPassword,
        });
        const result = await data.save();
        
        const token = jwt.sign({ 
            name: data.name,
            sid: data.sid, 
            email: data.email,
            role: data.role
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful signup (part 1)!");
        response.status(200).json({ message: "signup part 1 successful!", 
            token: token});
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }
};

export const signup2 = async (request, response) => {
    let sid = request.user.sid;
    console.log(sid);
    try {
        const existingSid = await UserDetail.findOne({ sid: sid });
        if (existingSid) {
            console.log("A User with this sid already exists!");
            return response.status(400).send("A User with this sid already exists!");
        }

        const data = new UserDetail({
            sid: sid,
            branch: request.body.branch,
            phoneNumber: request.body.phoneNumber,
            parentsNumber: request.body.parentsNumber
        })

        const result = await data.save();
        response.status(201).json({ message: "Signup complete!", role: request.user.role});
    }
    catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }

}

export const login = async (request, response) => {
    try {
        const existingUser = await User.findOne({email : request.body.email });
        if  (!existingUser) {
            console.log("No such User on platform! You should sign up");
            return response.status(400).send("No such User on platform! You should sign up");
        }

        const isValidPassword = await bcrypt.compare(request.body.password, existingUser.password);

        if (!isValidPassword) {
            console.log("Incorrect password!");
            return response.status(400).send("Incorrect password!");
        }

        let role = "student";
        if (request.body.email === "warden@example.com" || request.body.email === "warden2@example.com"
            || request.body.email === "warden3@example.com")
                role = "warden"


        const token = jwt.sign({ 
            name: existingUser.name,
            sid: existingUser.sid, 
            email: existingUser.email,
            role: role
         }, JWT_SECRET, { expiresIn: "2h",}
        );

        console.log("Successful login!");
        response.status(200).json({ message: "Login successful!", 
            role: role, token: token});
    }
     catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("An error occurred during login.");
    }
};
