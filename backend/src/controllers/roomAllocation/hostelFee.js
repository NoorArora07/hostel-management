import HostelFee from '../../models/hostelFees.model.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

//console.log("stripe key : ",process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiatePayment = async (req, res) => {
  try {
    const name = req.user.name;
    const studentId = req.user.sid;

    //calculating amount of hostel fee

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December

    // Extract admission year from the first two characters of studentId
    const admissionYear = 2000 + parseInt(String(studentId).substring(0, 2), 10); 

    // Determine the student's current year of study
    let studyYear;
    if (
      (currentYear === admissionYear && currentMonth >= 6) || // July to December of admission year
      (currentYear === admissionYear + 1 && currentMonth <= 4) // January to May of next year
    ) {
      studyYear = 1;
    } else if (
      (currentYear === admissionYear + 1 && currentMonth >= 5) ||
      (currentYear === admissionYear + 2 && currentMonth <= 4)
    ) {
      studyYear = 2;
    } else if (
      (currentYear === admissionYear + 2 && currentMonth >= 5) ||
      (currentYear === admissionYear + 3 && currentMonth <= 4)
    ) {
      studyYear = 3;
    } else if (
      (currentYear === admissionYear + 3 && currentMonth >= 5) ||
      (currentYear === admissionYear + 4 && currentMonth <= 4)
    ) {
      studyYear = 4;
    } else {
      return res.status(400).json({ message: "Invalid academic year calculation." });
    }

    // 1st year - 81500            
    // 2nd yr - 75500        
    // 3rd yr - 75100         
    // 4th yr - 69100               

    const feeStructure = {  
      1: 81500,
      2: 75500,
      3: 75100,
      4: 69100,
    };
    const amount = feeStructure[studyYear];
    console.log("amount : ",amount);

    await HostelFee.findOneAndUpdate(
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
            currency: 'INR',
            product_data: {
              name:`Mess Fee Payment - Student ID: ${studentId}`, 
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        studentId,
        name,
        amount,
      }, 
      success_url: "https://dormify-sigma.vercel.app/hostel_success?session_id={CHECKOUT_SESSION_ID}",
      //"http://localhost:5173/hostel_success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://dormify-sigma.vercel.app/hostel_cancel",
      //"http://localhost:5173/hostel_cancel",

    }); 
    console.log("done");
    res.json({ success: true, id: session.id, amount: amount });        
  } catch (error) {
    console.error("Payment gateway failed:", error);

    res.status(500).json({ success: false, error: "Failed to process payment" });

  }
};

export const updateFeeStatus = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.send("Invalid sessionId");
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const { studentId, name, amount } = session.metadata;

      await HostelFee.findOneAndUpdate(
        { studentId },
        {
          status: 'paid',
          amount: amount,
        },
        { new: true, upsert: true }
      );  
    
      console.log(`Fee status updated to 'paid' for studentId: ${studentId}`);
      res.redirect('https://dormify-sigma.vercel.app/hostel_success');
    } else {
      console.log('Payment not completed for sessionId:', sessionId);
      res.redirect('https://dormify-sigma.vercel.app/hostel_cancel');
    }
  } catch (err) {
    console.error(`Failed to update payment status: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};

export const getFeeStatus = async (req, res) => {
  try {
    const studentId = req.user.sid;
    const name = req.user.name;

    if (!studentId) {
      return res.send("Invalid studentId");
    }

    let fee = await HostelFee.findOne({ studentId });
    if(!fee){
      //calculating amount of hostel fee
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0 = January, 11 = December

    // Extract admission year from the first two characters of studentId
    const admissionYear = 2000 + parseInt(String(studentId).substring(0, 2), 10); 

    // Determine the student's current year of study
    let studyYear;
    if (
      (currentYear === admissionYear && currentMonth >= 6) || // July to December of admission year
      (currentYear === admissionYear + 1 && currentMonth <= 4) // January to May of next year
    ) {
      studyYear = 1;
    } else if (
      (currentYear === admissionYear + 1 && currentMonth >= 5) ||
      (currentYear === admissionYear + 2 && currentMonth <= 4)
    ) {
      studyYear = 2;
    } else if (
      (currentYear === admissionYear + 2 && currentMonth >= 5) ||
      (currentYear === admissionYear + 3 && currentMonth <= 4)
    ) {
      studyYear = 3;
    } else if (
      (currentYear === admissionYear + 3 && currentMonth >= 5) ||
      (currentYear === admissionYear + 4 && currentMonth <= 4)
    ) {
      studyYear = 4;
    } else {
      return res.status(400).json({ message: "Invalid academic year calculation." });
    }              

    const feeStructure = {  
      1: 81500,
      2: 75500,
      3: 75100,
      4: 69100,
    };
    const amount = feeStructure[studyYear];
    //console.log("amount : ",amount);

      res.json({name:name,studentId:studentId,status:"pending", amount:amount});
    }
    else{
      res.json({ name: fee.name, studentId: fee.studentId, status: fee.status, amount: fee.amount });
    }
  }
  catch (error) {
    console.error({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};