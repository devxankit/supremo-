import BlogPost from "../models/BlogPost.js";

// @desc    Get all blog posts
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogPost.find().sort({ date: -1, createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) {
      res.status(404);
      throw new Error("Blog post not found");
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private (Admin)
export const createBlog = async (req, res, next) => {
  try {
    const { title, slug, excerpt, category, readTime, author, image, body } = req.body;

    const slugExists = await BlogPost.findOne({ slug });
    if (slugExists) {
      res.status(400);
      throw new Error(`Blog post with slug '${slug}' already exists`);
    }

    const blog = await BlogPost.create({
      title, slug, excerpt, category, readTime, author, image, body
    });

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog post not found");
    }

    const updated = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog post not found");
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog post removed successfully" });
  } catch (error) {
    next(error);
  }
};

// Seed default blog posts on server start if empty
export const seedBlogs = async () => {
  // Default mock data seeding disabled
};
