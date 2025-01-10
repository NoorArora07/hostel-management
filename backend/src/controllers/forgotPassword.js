
//1. generate otp
//2. send otp via mail
//3. verify otp and update password in database 

import Pw_Reset from "../models/forgotPassword.model.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../models/users.model.js'; 
import jwt from 'jsonwebtoken';


export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate OTP
    const otp = crypto.randomBytes(3).toString('hex'); 
    const expires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    const passwordReset = new Pw_Reset({
      email,
      otp,
      expires,
    });
    await passwordReset.save();

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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP' });
      } else {
        return res.status(200).json({ message: 'OTP sent successfully' });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error generating OTP' });
  }
};


export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.user;

  try {
    
    const record = await Pw_Reset.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (record.expires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP' });
  }
};


export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { email } = req.user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne({ email }, { password: hashedPassword });

    // Clean up the OTP record
    await Pw_Reset.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Error resetting password' });
  }
};


