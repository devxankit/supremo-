import mongoose from "mongoose";

const blogBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["p", "h2", "ul"],
    required: true
  },
  text: {
    type: String,
    trim: true
  },
  items: [{
    type: String,
    trim: true
  }]
}, { _id: false });

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true
  },
  slug: {
    type: String,
    required: [true, "Blog slug is required"],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  excerpt: {
    type: String,
    required: [true, "Blog excerpt is required"],
    trim: true
  },
  category: {
    type: String,
    required: [true, "Blog category is required"],
    trim: true
  },
  readTime: {
    type: String,
    default: "5 min read",
    trim: true
  },
  author: {
    type: String,
    default: "Supremo Editorial",
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  date: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Published"
  },
  body: [blogBlockSchema]
}, {
  timestamps: true
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
