import express from "express";
import { verifyToken } from '../middleware/verifyToken.js';
import {fetch,markSeen,deleteNotif,addNotif} from "../controllers/notifsControllers.js";

const router = express.Router();

router.get("/view",verifyToken, fetch);
router.patch("/markSeen",verifyToken, markSeen);
router.patch("/delete",verifyToken,deleteNotif);

//for testing on postman
router.post("/add",verifyToken,addNotif);

export default router;