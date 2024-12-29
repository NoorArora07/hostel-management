import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"; 
import {getAllComplaints,updateComplaintStatus,} from "../controllers/warden_complaintsControllers.js";

const router = express.Router();

router.get("/all", verifyToken, getAllComplaints);
router.patch("/update-status", verifyToken, updateComplaintStatus);

export default router;
