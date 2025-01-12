import express from 'express';
import {sendOTP,verifyOTP,resetPassword} from '../controllers/forgotPassword.js';

const router = express.Router();

router.post('/forgot-password',sendOTP);
router.post('/verify-otp',verifyOTP);
router.post('/reset-password',resetPassword);

export default router;
