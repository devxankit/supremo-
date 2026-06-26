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
    default: "Media · Gallery"
  },
  mediaTitle: {
    type: String,
    default: "Inside our plants"
  },
  videosEyebrow: {
    type: String,
    default: "Watch"
  },
  videosTitle: {
    type: String,
    default: "Videos & walkthroughs"
  },
  blogsEyebrow: {
    type: String,
    default: "Knowledge Center"
  },
  blogsTitle: {
    type: String,
    default: "Guides, tips & insights"
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
