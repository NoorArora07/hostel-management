import express from 'express'
import { sendLateLeave } from '../controllers/lateLeaveController.js'
import { viewAcceptedLateLeaves } from '../controllers/lateLeaveController.js'
import { viewPendingLateLeaves } from '../controllers/lateLeaveController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.post("/", verifyToken, sendLateLeave);
router.get("/pending", verifyToken, viewPendingLateLeaves);
router.get("/accepted", verifyToken, viewAcceptedLateLeaves);

export default router