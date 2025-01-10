import express from 'express';
import {sendOTP,verifyOTP,resetPassword} from '../controllers/forgotPassword.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/forgot-password',verifyToken, sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', verifyToken,resetPassword);

export default router;
