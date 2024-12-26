import express from 'express';
import { viewRecent } from '../controllers/warden_lateLeave.js';
import { approveApplication } from '../controllers/warden_lateLeave.js';
import { disapproveApplication } from '../controllers/warden_lateLeave.js';

const router = express.Router();

router.get('/:filter', viewRecent);
router.patch('/approve', approveApplication);
router.patch('/disapprove', disapproveApplication);

export default router
