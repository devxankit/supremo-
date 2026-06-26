import express from "express";
import {
  getDealershipContent,
  updateDealershipContent
} from "../controllers/dealershipController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to fetch Dealership Page content layout
router.get("/", getDealershipContent);

// Admin-only route to update page layout details
router.put("/", protectAdmin, updateDealershipContent);

export default router;
