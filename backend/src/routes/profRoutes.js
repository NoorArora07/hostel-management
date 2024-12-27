import express from 'express';
import { viewProfile } from '../controllers/profileController.js';
import { editProfile } from '../controllers/profileController.js';
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router();

router.get("/", verifyToken, viewProfile);
router.patch("/edit", verifyToken, editProfile);

export default router

