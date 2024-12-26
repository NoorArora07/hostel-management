import express from 'express'
import { sendLongLeave } from '../controllers/longLeaveController.js'
import { viewPendingLongLeaves } from '../controllers/longLeaveController.js';
import { viewAcceptedLongLeaves } from '../controllers/longLeaveController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, sendLongLeave);
router.get('/pending/', verifyToken, viewPendingLongLeaves);
router.get('/accepted/', verifyToken, viewAcceptedLongLeaves);

export default router