import express from "express";
import {
  createContactApplication,
  getContactApplications,
  updateContactApplicationStatus,
  deleteContactApplication,
  sendContactEmail
} from "../controllers/contactApplicationController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { formLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

// Public contact submission (rate limited)
router.post("/", formLimiter, createContactApplication);

// Protected admin routes for dashboard management
router.get("/", protectAdmin, getContactApplications);
router.post("/:id/send-email", protectAdmin, sendContactEmail);
router.put("/:id", protectAdmin, updateContactApplicationStatus);
router.delete("/:id", protectAdmin, deleteContactApplication);

export default router;
