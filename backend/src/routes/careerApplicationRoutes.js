import express from "express";
import {
  createCareerApplication,
  getCareerApplications,
  updateCareerApplicationStatus,
  deleteCareerApplication,
  sendCareerEmail
} from "../controllers/careerApplicationController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public submission route for career applications
router.post("/", createCareerApplication);

// Protected admin routes for listing and managing submissions
router.get("/", protectAdmin, getCareerApplications);
router.post("/:id/send-email", protectAdmin, sendCareerEmail);
router.put("/:id", protectAdmin, updateCareerApplicationStatus);
router.delete("/:id", protectAdmin, deleteCareerApplication);

export default router;
