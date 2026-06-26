import express from "express";
import { getJourneyContent, updateJourneyContent } from "../controllers/journeyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getJourneyContent);
router.put("/", protectAdmin, updateJourneyContent);

export default router;
