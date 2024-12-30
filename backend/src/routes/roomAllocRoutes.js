import express from 'express';

import { updateRoom } from '../controllers/roomAlloc_room.js';
import { selectRoom } from '../controllers/roomAlloc_person.js';
import { makeRoom } from '../controllers/roomAlloc_room.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/person", verifyToken, selectRoom);
router.patch("/room", verifyToken, updateRoom);
router.post("/create-room", makeRoom);

export default router