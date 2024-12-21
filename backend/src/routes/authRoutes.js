import express from 'express';

import { login } from '../controllers/authController.js';
import { signup1 } from '../controllers/authController.js';
import { signup2 } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup", signup1);
router.post("/signup/:sid", signup2);
router.post("/login", login);

export default router;