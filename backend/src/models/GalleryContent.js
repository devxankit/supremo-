import mongoose from "mongoose";

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: "Factory",
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  span: {
    type: Boolean,
    default: false
  }
});

const galleryVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    default: "",
    trim: true
  }
});

const galleryBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: "Buying Guides",
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  }
});

const galleryContentSchema = new mongoose.Schema({
  mediaEyebrow: {
    type: String,
    default: ""
  },
  mediaTitle: {
    type: String,
    default: ""
  },
  videosEyebrow: {
    type: String,
    default: ""
  },
  videosTitle: {
    type: String,
    default: ""
  },
  blogsEyebrow: {
    type: String,
    default: ""
  },
  blogsTitle: {
    type: String,
    default: ""
  },
  items: {
    type: [galleryItemSchema],
    default: []
  },
  videos: {
    type: [galleryVideoSchema],
    default: []
  },
  blogs: {
    type: [galleryBlogSchema],
    default: []
  }
}, {
  timestamps: true,
  collection: "gallery_content"
});

const GalleryContent = mongoose.model("GalleryContent", galleryContentSchema);

export default GalleryContent;
