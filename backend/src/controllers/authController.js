import {request, response} from 'express';
import dotenv from 'dotenv';
import User from '../models/users.model.js';
import UserDetail from '../models/userDetail.model.js';
// import cors from 'cors';
dotenv.config();

// app.use(cors());
// app.get('/', (request, response) => {
//     // response.render('home');
//     response.send('home page');
// })

// app.get('/login', (request, response) => {
//     // response.render('login');
//     response.send(`login page! if you haven't made an account yet, sign up!`);
    
// })

// app.get('/signup', (request, response) => {
//     // response.render('signup');
//     response.send(`creating a new account! this is the signup page`);
// })

export const signup1 =  async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const existingSid = await User.findOne({ name: request.body.sid });
        if (existingSid) {
            console.log("A User with this sid already exists!");
            return response.status(400).send("A User with this sid already exists!");
        }

        const existingEmail = await User.findOne({ email: request.body.email });
        if (existingEmail) {
            console.log("Cannot use the same email more than once!");
            return response.status(400).send("This email is already in use!");
        }

        const data = new User(request.body);
        const result = await data.save();
        // console.log("User saved successfully:", result);
        response.status(201).json({ message: "Part one of signup successful!", sid: result.sid });
        // response.render('home');
        // response.send('home page');
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }
};

export const signup2 = async (request, response) => {
    //params has sid
    try {
        let sid = request.params.sid;
        const data = new UserDetail({
            sid: sid,
            branch: request.body.branch,
            phoneNumber: request.body.phoneNumber,
            parentsNumber: request.body.parentsNumber
        })

        const result = await data.save();
        response.status(201).json({ message: "Signup complete!", sid: result.sid});
    }
    catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }

}

export const login = async (request, response) => {
    try {
        const existingEmail = await User.findOne({email : request.body.email });
        if (!existingEmail) {
            console.log("No such User on platform! You should sign up");
            return response.status(400).send("No such User on platform! You should sign up");
        }

        let result = await User.findOne({
            email: request.body.email,
            password: request.body.password
        });

        if (result) {
            console.log("Successful login!");
            // response.render('home');
            response.send('home page');
        }
        else {
            return response.status(400).send("Incorrect details!");
        }
    } catch (error) {
        console.error("Error during login:", error);
        response.status(500).send("An error occurred during login.");
    }
};

