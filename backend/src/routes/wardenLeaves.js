// import { verify } from 'jsonwebtoken';
import { viewRecent } from '../controllers/warden_longLeave.js';
import { verifyToken } from '../middleware/verifyToken.js';
import express from 'express';

const router = express.Router();

router.get('/long-leaves', verifyToken, viewRecent);

export default router