import express from "express";
import {
  getCareersContent,
  updateCareersContent
} from "../controllers/careersController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Careers Page dynamic content
router.get("/", getCareersContent);

// Admin-only route to update page content details
router.put("/", protectAdmin, updateCareersContent);

export default router;
