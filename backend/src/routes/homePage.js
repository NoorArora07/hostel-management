import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
    response.send("welcome to the home page");
})