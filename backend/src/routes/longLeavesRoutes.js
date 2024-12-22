import express from 'express'
import { sendLongLeave } from '../controllers/longLeaveController.js'

const router = express.Router();

router.post('/longLeave/:sid', sendLongLeave);

export default router