import express from 'express'
import { sendLongLeave } from '../controllers/longLeaveController.js'
import { viewPendingLongLeaves } from '../controllers/longLeaveController.js';
import { viewAcceptedLongLeaves } from '../controllers/longLeaveController.js';

const router = express.Router();

router.post('/longLeave/:sid', sendLongLeave);
router.get('/longLeaves/:sid', viewPendingLongLeaves);
router.get('/longLeaves/:sid', viewAcceptedLongLeaves);

export default router