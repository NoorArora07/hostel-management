import express from 'express';

import { makeRoom } from '../controllers/roomAllocation/room.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { fetchRooms } from '../controllers/roomAllocation/fetchRooms.js';
import { declineInWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { acceptInWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { viewWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { leaveWaitingList } from '../controllers/roomAllocation/waitingList.js';
import { viewPartOf } from '../controllers/roomAllocation/fetchRooms.js';

const router = express.Router();

router.post("/create-room", makeRoom);
router.get("/get-rooms/:floor", fetchRooms);
router.get("/waiting-list/", verifyToken, viewWaitingList);
router.patch("/waiting-list/accept", verifyToken, acceptInWaitingList);
router.patch("/waiting-list/decline", verifyToken, declineInWaitingList);
router.patch("/waiting-list/leave", verifyToken, leaveWaitingList);
router.get("/get-info/:roomNumber", verifyToken, viewPartOf);

export default router 