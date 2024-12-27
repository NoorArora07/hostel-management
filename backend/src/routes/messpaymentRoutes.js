import express from 'express';
import { createPaymentIntent, getPaymentDetails } from '../controllers/messpaymentControllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create-payment-intent',verifyToken, createPaymentIntent);

// get payment details
router.get('/payment-details/:id', getPaymentDetails);

export default router;



