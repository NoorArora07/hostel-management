
//1. generate otp
//2. send otp via mail
//3. verify otp and update password in database 

import Pw_Reset from "../models/forgotPassword.model.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../models/users.model.js'; 
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/verifyToken.js';

export const sendOTP = async (req, res) => {
  const { email} = req.body;

  try {
    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex'); 
    console.log("otp : ",otp);
    const expires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // //creating temporary jwt token for password reset 
    // const tempToken = jwt.sign({email},JWT_SECRET,{expiresIn:'15m'});
    // console.log("Temp token generated:", tempToken);

    const passwordReset = new Pw_Reset({
      email,
      otp,
      expires
     // tempToken
    });
    console.log("saving otp");
    await passwordReset.save();
    console.log("saved otp");

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP to reset your password is ${otp}. It will expire in 10 minutes.`,
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP' });
      } else {
       // console.log("temp token : ", tempToken);
        return res.status(200).json({ 
          message: 'OTP sent successfully'
          //,tempToken 
        });
      }
    });
  } catch (error) {
    console.log("unable to send mail, error : ",error);
    return res.status(500).json({ message: 'Error generating OTP' });
  }
};


export const verifyOTP = async (req, res) => {
  const { otp,email } = req.body;
 // const tempToken = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  try {
    // Verify temporary token
    // const decoded = jwt.verify(tempToken,JWT_SECRET); // Make sure JWT_SECRET is correctly defined in your environment variables
    // const email = decoded.email;

    const record = await Pw_Reset.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (record.expires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error.message || error);
    return res.status(500).json({ message: 'Error verifying OTP' });
  }
};


export const resetPassword = async (req, res) => {
  const { email,password } = req.body;
  //const tempToken = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  console.log('password ', password)
  try {
    // // Verify temporary token
    // const decoded = jwt.verify(tempToken,JWT_SECRET); // Use environment variable
    // const email = decoded.email;
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashed-password ', hashedPassword)
    // Update the user's password
    await User.updateOne({ email }, { password: hashedPassword });

    // Clean up the OTP record
    await Pw_Reset.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error.message || error);
    return res.status(500).json({ message: 'Error resetting password' });
  }
};

