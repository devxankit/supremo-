import express from "express";
import { getAboutContent, updateAboutContent } from "../controllers/aboutController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAboutContent);
router.put("/", protectAdmin, updateAboutContent);

export default router;
