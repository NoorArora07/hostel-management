import Fee from '../models/messpayment.model.js';
import Mess from '../models/mess.model.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config(); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiatePayment= async (req, res) => {
  try {
      const name = req.user.name;
      const studentId = req.user.sid; 
      const amount = req.body.amount;

    // Add a pending record to the database before payment is initiated
    await Fee.findOneAndUpdate(
        { studentId }, 
        { name, studentId, amount, status: 'pending' }, 
        { new: true, upsert: true } 
      );

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
            name,
            amount,
          },
          success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
          cancel_url: "http://localhost:5173/cancel",
 
      });
      res.json({success:true, id: session.id});
  } catch (error) {
        console.error("Payment gateway failed:", error);

        res.status(500).json({ success: false, error: "Failed to process payment"});

  }
}; 

export const updateFeeStatus = async (req, res) => {
  const name = req.user.name;
  const studentId = req.user.sid;

      if (!studentId) {
    return res.send("Invalid studentId");
}
      try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const amount = session.metadata.amount;

        if (session.payment_status !== 'unpaid') {
            const { studentId } = session.metadata;
      
            // Update the fee status to paid
            await Fee.findOneAndUpdate(
                {name},
                {studentId },
                {status: 'paid' },
                {feeStatus: 'paid'},
                {amount},
                { new: true, upsert: true }
            );
      
            console.log(`Fee status updated to 'paid' for studentId: ${studentId}`);
            res.redirect('http://localhost:5173/success');
          } 
          else {
            console.log('Retrieved Stripe session:', session);

            console.log(`Payment not completed for sessionId: ${sessionId}`);
            
            res.redirect('http://localhost:5173/cancel');
          }
        } catch (err) {
          console.error(`Failed to update payment status: ${err.message}`);
          res.status(500).json({ error: err.message });
        }
      };
                  

export const getFeeStatus = async (req, res) => {
  try {
      const studentId  = req.user.sid;
      const name = req.user.name;

      if (!studentId) {
        return res.send("Invalid studentId");
    }

     let fee = await Fee.findOne({ studentId });
      res.json({ name:fee.name, studentId: fee.studentId, status: fee.status, amount :fee.amount });
  } 
  catch (error) {
      console.error({error:error.message});
      res.status(500).json({ error: error.message });
  }
};

