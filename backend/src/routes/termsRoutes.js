import express from "express";
import {
  getTermsContent,
  updateTermsContent
} from "../controllers/termsController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Terms page dynamic configuration
router.get("/", getTermsContent);

// Admin-only route to update Terms content
router.put("/", protectAdmin, updateTermsContent);

export default router;
