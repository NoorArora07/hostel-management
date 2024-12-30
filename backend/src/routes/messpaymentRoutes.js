import express from 'express';
import { initiatePayment,updateFeeStatus,getFeeStatus } from '../controllers/messpaymentControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/paynow',verifyToken, initiatePayment);
router.post('/updateStatus',verifyToken, updateFeeStatus);
router.get('/status',verifyToken, getFeeStatus);



export default router;



