import Product from "../models/Product.js";
import Settings from "../models/Settings.js";
import { sendAdminNotification } from "../utils/mailer.js";

// @desc    Get all products (with optional category filter)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Admin)
export const createProduct = async (req, res, next) => {
  try {
    const {
      name, slug, sku, category, tagline, capacity,
      description, badges, features, applications,
      sizes, colors, specs, modelNo, images, price, stock, status,
      brochureUrl, showBrochure
    } = req.body;

    const skuExists = await Product.findOne({ sku });
    if (skuExists) {
      res.status(400);
      throw new Error(`Product with SKU '${sku}' already exists`);
    }

    const slugExists = await Product.findOne({ slug });
    if (slugExists) {
      res.status(400);
      throw new Error(`Product with slug '${slug}' already exists`);
    }

    const product = await Product.create({
      name, slug, sku, category, tagline, capacity,
      description, badges, features, applications,
      sizes, colors, specs, modelNo, images, price, stock, status,
      brochureUrl, showBrochure
    });

    // Check low stock alert
    await checkLowStockAlert(product);

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Helper for low stock alerts
const checkLowStockAlert = async (product) => {
  try {
    if (product.stock < 10) {
      const settings = await Settings.findOne();
      if (settings?.lowStockAlerts) {
        await sendAdminNotification(
          `Low Stock Alert: ${product.name}`,
          `The product "${product.name}" (SKU: ${product.sku}) is running low on stock. ` +
          `Current level: ${product.stock} units (threshold is 10 units).`
        );
      }
    }
  } catch (err) {
    console.error("Failed to run low stock alert check:", err.message);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    // Update fields
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    // Check low stock alert
    await checkLowStockAlert(updated);

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    next(error);
  }
};

