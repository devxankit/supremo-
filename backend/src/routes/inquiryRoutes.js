import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getDashboardStats,
  recordVisit,
  getRecentNotifications,
  getAnalyticsStats,
  getSidebarCounts,
  sendInquiryEmail
} from "../controllers/inquiryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public submission routes
router.post("/", createInquiry);
router.post("/visit", recordVisit);

// Protected admin routes
router.get("/sidebar-counts", protectAdmin, getSidebarCounts);
router.get("/notifications", protectAdmin, getRecentNotifications);
router.get("/analytics", protectAdmin, getAnalyticsStats);
router.get("/stats", protectAdmin, getDashboardStats);

router.get("/", protectAdmin, getInquiries);
router.post("/:id/send-email", protectAdmin, sendInquiryEmail);
router.put("/:id", protectAdmin, updateInquiryStatus);
router.delete("/:id", protectAdmin, deleteInquiry);

export default router;
