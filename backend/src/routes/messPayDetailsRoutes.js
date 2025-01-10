import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getDetails } from '../controllers/messPaymentDetailsControllers.js';

const router = express.Router();

router.get("/", verifyToken, getDetails);

export default router; 
