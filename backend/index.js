import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import User from './models/users.model.js';

dotenv.config();
const app = express();
app.use(express.json());
app.set("view engine", "hbs");
app.use(express.urlencoded({extended:false}));

app.get('/', (request, response) => {
    // response.render('home');
    response.send('home page');
})

app.get('/login', (request, response) => {
    // response.render('login');
    response.send(`login page! if you haven't made an account yet, sign up!`);
    
})

app.get('/signup', (request, response) => {
    // response.render('signup');
    response.send(`creating a new account! this is the signup page`);
})

app.post('/signup', async (request, response) => {
    console.log("Request Body:", request.body);

    try {
        const existingName = await User.findOne({ name: request.body.name });
        if (existingName) {
            console.log("A User with this name already exists!");
            return response.status(400).send("A User with this name already exists!");
        }

        const existingEmail = await User.findOne({ email: request.body.email });
        if (existingEmail) {
            console.log("Cannot use the same email more than once!");
            return response.status(400).send("Cannot use the same email more than once!");
        }

        const data = new User(request.body);
        const result = await data.save();
        console.log("User saved successfully:", result);

        // response.render('home');
        response.send('home page');
    } catch (error) {
        console.error("Error during signup:", error);
        response.status(500).send("An error occurred during signup.");
    }
});

app.post('/login', async (request, response) => {
    try {
        const existingName = await User.findOne({name : request.body.name });
        if (!existingName) {
            console.log("No such User on platform! You should sign up");
            return response.status(400).send("No such User on platform! You should sign up");
        }

        let result = await User.findOne({
            name: request.body.name,
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
})


app.listen(5090, () => {
    connectDb();
    console.log("Server started at http://127.0.0.1:5090");
});