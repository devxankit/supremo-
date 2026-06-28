import express from "express";
import { loginAdmin, getAdminProfile, updateAdminProfile, updateAdminPassword } from "../controllers/authController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

// Public login route (rate limited against brute-force)
router.post("/login", authLimiter, loginAdmin);

// Protected profile verification route
router.get("/me", protectAdmin, getAdminProfile);

// Protected update profile and password routes
router.put("/profile", protectAdmin, updateAdminProfile);
router.put("/password", protectAdmin, updateAdminPassword);

export default router;

