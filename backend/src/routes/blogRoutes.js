import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected routes (Admin only)
router.post("/", protectAdmin, createBlog);
router.put("/:id", protectAdmin, updateBlog);
router.delete("/:id", protectAdmin, deleteBlog);

export default router;
