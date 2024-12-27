import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { MessLeaveForm,getMessStatus,getMessLeaveDetails } from '../controllers/messController.js';

const router = express.Router();

router.get("/status", verifyToken, getMessStatus);
router.post("/off", verifyToken, MessLeaveForm);
router.get("/leave-details", verifyToken, getMessLeaveDetails);

export default router; 
