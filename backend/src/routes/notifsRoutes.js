import express from "express";
import { verifyToken } from '../middleware/verifyToken.js';
import {fetch,markSeen,deleteNotif,addNotif} from "../controllers/notifsControllers.js";

const router = express.Router();

router.get("/view",verifyToken, fetch);
router.put("/markSeen",verifyToken, markSeen);
router.delete("/delete",verifyToken,deleteNotif);

//only for testing on postman
router.post("/add",verifyToken,addNotif);

export default router;