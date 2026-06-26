import express from "express";
import { getWhyUsContent, updateWhyUsContent } from "../controllers/whyUsController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getWhyUsContent);
router.put("/", protectAdmin, updateWhyUsContent);

export default router;
