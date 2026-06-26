import express from "express";
import {
  getContactContent,
  updateContactContent
} from "../controllers/contactController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Contact Page dynamic configuration
router.get("/", getContactContent);

// Admin-only route to update Contact settings
router.put("/", protectAdmin, updateContactContent);

export default router;
