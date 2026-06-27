import mongoose from "mongoose";

const heroContentSchema = new mongoose.Schema({
  bgType: {
    type: String,
    enum: ["video", "image"],
    default: "video"
  },
  videoUrl: {
    type: String,
    default: ""
  },
  videoName: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  },
  imageName: {
    type: String,
    default: ""
  },
  overlayDark: {
    type: Number,
    default: 30
  },
  align: {
    type: String,
    enum: ["left", "center"],
    default: "left"
  },
  showEyebrow: {
    type: Boolean,
    default: true
  },
  eyebrow: {
    type: String,
    default: ""
  },
  heading: {
    type: String,
    default: ""
  },
  headingAccent: {
    type: String,
    default: ""
  },
  showSub: {
    type: Boolean,
    default: true
  },
  sub: {
    type: String,
    default: ""
  },
  showPrimary: {
    type: Boolean,
    default: true
  },
  primaryLabel: {
    type: String,
    default: ""
  },
  primaryLink: {
    type: String,
    default: ""
  },
  showSecondary: {
    type: Boolean,
    default: true
  },
  secondaryLabel: {
    type: String,
    default: ""
  },
  secondaryLink: {
    type: String,
    default: ""
  },
  showScrollCue: {
    type: Boolean,
    default: true
  },
  feature1Title: { type: String },
  feature1Desc: { type: String },
  feature2Title: { type: String },
  feature2Desc: { type: String },
  feature3Title: { type: String },
  feature3Desc: { type: String },
  feature4Title: { type: String },
  feature4Desc: { type: String },
  feature5Title: { type: String },
  feature5Desc: { type: String }
}, {
  timestamps: true,
  collection: "hero_content"
});

const HeroContent = mongoose.model("HeroContent", heroContentSchema);

export default HeroContent;
