import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import {getEvents,createEvent,} from '../controllers/warden_mess.js';

const router = express.Router();

router.get('/getEvent', verifyToken, getEvents);
router.post('/createEvent', verifyToken, createEvent);
//router.put('updateEvent/:id', verifyToken, updateEvent);
//router.delete('deleteEvent/:id', verifyToken, deleteEvent);

export default router;
