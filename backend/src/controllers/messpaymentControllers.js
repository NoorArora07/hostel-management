import Payment from '../models/messpayment.model.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  {
    const { amount, currency } = req.body;  
    try {      
      const paymentIntent = await stripe.paymentIntents.create({
        amount, 
        currency,
        payment_method_types: ['card'],
      });
     
      const payment = new Payment({
        paymentIntentId: paymentIntent.id,
        amount,
        currency,
        status: paymentIntent.status,
      });
      await payment.save();
  
      // Send client secret to the frontend
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

export const getPaymentDetails = async (req, res) => {

  const { id } = req.params;

  try {
    const payment = await Payment.findOne({ paymentIntentId: id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
