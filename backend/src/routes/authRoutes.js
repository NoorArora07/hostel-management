import express from 'express';

import { login } from '../controllers/authController.js';
import { signup1 } from '../controllers/authController.js';
import { signup2 } from '../controllers/authController.js';

const router = express.Router();

router.post("/signup1", signup1);
router.post("/signup2/:sid", signup2);
router.post("/login", login);

export default router;