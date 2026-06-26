import express from "express";
import { getHeroContent, updateHeroContent } from "../controllers/heroController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getHeroContent);
router.put("/", protectAdmin, updateHeroContent);

export default router;
