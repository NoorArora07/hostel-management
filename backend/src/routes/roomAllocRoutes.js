import express from 'express';

import { updateRoom } from '../controllers/roomAllocation/room.js';
import { selectRoom } from '../controllers/roomAllocation/person.js';
import { makeRoom } from '../controllers/roomAllocation/room.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { fetchRooms } from '../controllers/roomAllocation/fetchRooms.js';
import { declineInWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { acceptInWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { viewWaitingList } from '../controllers/roomAllocation/waitingList.js';

const router = express.Router();

router.post("/person", verifyToken, selectRoom);
router.patch("/room", verifyToken, updateRoom);
router.post("/create-room", makeRoom);
router.get("/get-rooms/:floor", fetchRooms);
router.get("/waiting-list/", verifyToken, viewWaitingList);
router.patch("/waiting-list/accept", verifyToken, acceptInWaitingList);
router.patch("/waiting-list/decline", verifyToken, declineInWaitingList);

export default router