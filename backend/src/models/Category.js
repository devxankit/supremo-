import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true
  },
  slug: {
    type: String,
    required: [true, "Category slug is required"],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  color: {
    type: String,
    required: true,
    default: "#1466E6"
  },
  eyebrow: {
    type: String,
    trim: true,
    default: ""
  },
  blurb: {
    type: String,
    trim: true,
    default: ""
  },
  icon: {
    type: String,
    enum: ["tank", "pipe", "box", "plant"],
    default: "box"
  },
  image: {
    type: String,
    trim: true,
    default: ""
  }
}, {
  timestamps: true,
  collection: "categories"
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
