import express from 'express'
import { sendLongLeave } from '../controllers/longLeaveController.js'
import { viewPendingLongLeaves } from '../controllers/longLeaveController.js';
import { viewAcceptedLongLeaves } from '../controllers/longLeaveController.js';
import { authenticateToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/longLeave/', authenticateToken, sendLongLeave);
router.get('/longLeave/pending/', viewPendingLongLeaves);
router.get('/longLeave/accepted/', viewAcceptedLongLeaves);

export default router