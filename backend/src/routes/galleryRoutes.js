import express from "express";
import { getGalleryContent, updateGalleryContent, getYoutubeDurationApi } from "../controllers/galleryController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getGalleryContent);
router.get("/youtube-duration", getYoutubeDurationApi);
router.put("/", protectAdmin, updateGalleryContent);

export default router;
