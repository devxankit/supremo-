import mongoose from "mongoose";

const homepageSectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  visible: {
    type: Boolean,
    default: true
  },
  locked: {
    type: Boolean,
    default: false
  },
  href: {
    type: String
  },
  heading: {
    type: String
  },
  headingHighlight: {
    type: String
  },
  sub: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: "homepage_sections"
});

const HomepageSection = mongoose.model("HomepageSection", homepageSectionSchema);

export default HomepageSection;
