import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addDetails } from '../controllers/wardenMessPayDetailsControllers.js';

const router = express.Router();

router.post("/add",verifyToken,addDetails);

export default router;