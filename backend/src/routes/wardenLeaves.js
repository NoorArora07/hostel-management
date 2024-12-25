// import { verify } from 'jsonwebtoken';
import { viewRecent } from '../controllers/warden_longLeave.js';
import { approveApplication } from '../controllers/warden_longLeave.js';
import { deleteApplication } from '../controllers/warden_longLeave.js';
import { verifyToken } from '../middleware/verifyToken.js';
import express from 'express';

const router = express.Router();

router.get('/long-leaves', viewRecent);
router.patch('/long-leaves/delete', deleteApplication);
router.patch('/long-leaves/approve', approveApplication);

export default router