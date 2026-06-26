import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true }
}, { _id: false });

const productSpecSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  slug: {
    type: String,
    required: [true, "Product slug is required"],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  sku: {
    type: String,
    required: [true, "Product SKU is required"],
    unique: true,
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: [true, "Category slug is required"],
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  },
  capacity: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  badges: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  applications: [{
    type: String,
    trim: true
  }],
  sizes: [{
    type: String,
    trim: true
  }],
  colors: [productColorSchema],
  specs: [productSpecSchema],
  modelNo: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  price: {
    type: String,
    required: [true, "Price string is required"],
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ["Active", "Out of Stock", "Low Stock", "Draft"],
    default: "Active"
  },
  brochureUrl: {
    type: String,
    trim: true
  },
  showBrochure: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
