import express from 'express';
import { checkRole } from '../controllers/roleController.js';
// import { verify } from 'jsonwebtoken';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/check-role", verifyToken, checkRole);

export default router