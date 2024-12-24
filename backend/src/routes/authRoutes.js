import express from 'express';

import { login } from '../controllers/authController.js';
import { signup1 } from '../controllers/authController.js';
import { signup2 } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/signup", signup1);
router.post("/signup2", authenticateToken, signup2);
router.post("/login", login);

export default router;