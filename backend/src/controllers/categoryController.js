import Category from "../models/Category.js";
import Product from "../models/Product.js";

// @desc    Get all categories with product counts
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    // Fetch product counts for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        // Count products matching the category slug
        const productCount = await Product.countDocuments({ category: cat.slug });
        return {
          _id: cat._id,
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          color: cat.color,
          eyebrow: cat.eyebrow,
          blurb: cat.blurb,
          icon: cat.icon,
          image: cat.image || "",
          products: productCount,
        };
      })
    );
    res.json(categoriesWithCount);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private (Admin)
export const createCategory = async (req, res, next) => {
  try {
    const { name, slug, color, eyebrow, blurb, icon, image } = req.body;

    const slugExists = await Category.findOne({ slug: slug.toLowerCase() });
    if (slugExists) {
      res.status(400);
      throw new Error(`Category with slug '${slug}' already exists`);
    }

    const category = await Category.create({
      name,
      slug: slug.toLowerCase(),
      color: color || "#1466E6",
      eyebrow: eyebrow || "",
      blurb: blurb || "",
      icon: icon || "box",
      image: image || ""
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    if (req.body.slug && req.body.slug.toLowerCase() !== category.slug) {
      const slugExists = await Category.findOne({ slug: req.body.slug.toLowerCase() });
      if (slugExists) {
        res.status(400);
        throw new Error(`Category with slug '${req.body.slug}' already exists`);
      }
    }

    if (req.body.slug) {
      req.body.slug = req.body.slug.toLowerCase();
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category removed successfully" });
  } catch (error) {
    next(error);
  }
};

