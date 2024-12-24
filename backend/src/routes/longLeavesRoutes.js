import express from 'express'
import { sendLongLeave } from '../controllers/longLeaveController.js'
import { viewPendingLongLeaves } from '../controllers/longLeaveController.js';
import { viewAcceptedLongLeaves } from '../controllers/longLeaveController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/long-leaves/', verifyToken, sendLongLeave);
router.get('/long-leaves/pending/', viewPendingLongLeaves);
router.get('/long-leaves/accepted/', viewAcceptedLongLeaves);

export default router