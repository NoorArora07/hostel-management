import express from 'express';
import { initiatePayment,updateFeeStatus,getFeeStatus, generateStripeSignature } from '../controllers/messpaymentControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/paynow',verifyToken, initiatePayment);
router.post('/generate-signature', generateStripeSignature);
//router.post('/updateStatus',verifyToken, updateFeeStatus);
//router.get('/status/:studentId',verifyToken, getFeeStatus);



export default router;



