import express from "express";
import {
  getPrivacyContent,
  updatePrivacyContent
} from "../controllers/privacyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Privacy page dynamic configuration
router.get("/", getPrivacyContent);

// Admin-only route to update Privacy content
router.put("/", protectAdmin, updatePrivacyContent);

export default router;
