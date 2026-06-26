import express from "express";
import {
  createContactApplication,
  getContactApplications,
  updateContactApplicationStatus,
  deleteContactApplication,
  sendContactEmail
} from "../controllers/contactApplicationController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public contact submission
router.post("/", createContactApplication);

// Protected admin routes for dashboard management
router.get("/", protectAdmin, getContactApplications);
router.post("/:id/send-email", protectAdmin, sendContactEmail);
router.put("/:id", protectAdmin, updateContactApplicationStatus);
router.delete("/:id", protectAdmin, deleteContactApplication);

export default router;
