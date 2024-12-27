import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getEvents,MessLeaveForm,getMessStatus,getMessLeaveDetails } from '../controllers/messController.js';

const router = express.Router();

router.get("/status", verifyToken, getMessStatus);
router.post("/off", verifyToken, MessLeaveForm);
router.get("/leave-details", verifyToken, getMessLeaveDetails);
router.get("/getEvent", verifyToken, getEvents);

export default router; 
