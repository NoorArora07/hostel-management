import express from "express";
import { verifyToken } from '../middleware/verifyToken.js';
import {addComplaint,viewComplaints, viewComplaintsByStatus 
} from "../controllers/complaintsControllers.js";

const router = express.Router();


router.post("/add",verifyToken, addComplaint);
router.get("/view",verifyToken, viewComplaints);
router.get("/status",verifyToken, viewComplaintsByStatus);

export default router;
