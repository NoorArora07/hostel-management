import Fee from '../models/messpayment.model.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config(); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiatePayment= async (req, res) => {
  try {
      const studentId = req.user.sid; 
      const { amount } = req.body;

      const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'payment',
          line_items: [
              {
                  price_data: {
                      currency: 'USD',
                      product_data: {
                          name: `Mess Fee Payment - Student ID: ${studentId}`,
                      },
                      unit_amount: amount * 100, // Amount in paise
                  },
                  quantity: 1,
              },
          ],
          metadata: {
              studentId,
          },
          //success_url: "http://localhost:5173/Homepage",
          //cancel_url: "http://localhost:5000", 
      });
      res.json({ url: session.url });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const updateFeeStatus = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];

  let event;

  try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const studentId = session.metadata.studentId; // Retrieve studentId from metadata

      try {
          // Update fee status to paid
          await Fee.findOneAndUpdate(
              { studentId },
              { status: 'paid' },
              { new: true, upsert: true }
          );
          console.log(`Fee status updated for studentId: ${studentId}`);
      } catch (err) {
          console.error(`Database update failed: ${err.message}`);
      }
  }

  res.status(200).json({ received: true });
};

export const getFeeStatus = async (req, res) => {
  try {
      const studentId  = req.user.sid;

      const fee = await Fee.findOne({ studentId });

      if (!fee) {
          return res.status(404).json({ message: "No record found" });
      }

      res.json({ studentId: fee.studentId, status: fee.status });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Generating stripe signature for testing on postman
export const generateStripeSignature = async (req, res) => {
  try {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; 
    const timestamp = Math.floor(Date.now() / 1000); 
    const payload = JSON.stringify(req.body); 
    const signature = crypto
      .createHmac('sha256', endpointSecret)
      .update(`${timestamp}.${payload}`)
      .digest('hex');

    const stripeSignature = `t=${timestamp},v1=${signature}`;

    res.json({
      message: "Stripe signature generated successfully",
      signature: stripeSignature,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};