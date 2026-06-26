import express from "express";
import {
  getWarrantyContent,
  updateWarrantyContent
} from "../controllers/warrantyController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Warranty page dynamic configuration
router.get("/", getWarrantyContent);

// Admin-only route to update Warranty content
router.put("/", protectAdmin, updateWarrantyContent);

export default router;
