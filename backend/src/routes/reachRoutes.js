import express from "express";
import { getReachContent, updateReachContent } from "../controllers/reachController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getReachContent);
router.put("/", protectAdmin, updateReachContent);

export default router;
