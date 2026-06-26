import mongoose from "mongoose";

const heroContentSchema = new mongoose.Schema({
  bgType: {
    type: String,
    enum: ["video", "image"],
    default: "video"
  },
  videoUrl: {
    type: String,
    default: "/vidoes/supremo_film.mp4"
  },
  videoName: {
    type: String,
    default: "supremo_film.mp4"
  },
  imageUrl: {
    type: String,
    default: "/images/img_hero.png"
  },
  imageName: {
    type: String,
    default: "img_hero.png"
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
    default: "Pan-India Polymer Manufacturer"
  },
  heading: {
    type: String,
    default: "Built to Hold"
  },
  headingAccent: {
    type: String,
    default: "India's Water."
  },
  showSub: {
    type: Boolean,
    default: true
  },
  sub: {
    type: String,
    default: "Triple-layer water tanks, ISI-certified PVC pipes, planters and utility products — manufactured in four ISO-certified plants and trusted by our extensive dealer network across 22 states."
  },
  showPrimary: {
    type: Boolean,
    default: true
  },
  primaryLabel: {
    type: String,
    default: "Become a Dealer"
  },
  primaryLink: {
    type: String,
    default: "/dealership"
  },
  showSecondary: {
    type: Boolean,
    default: true
  },
  secondaryLabel: {
    type: String,
    default: "Download Catalogue"
  },
  secondaryLink: {
    type: String,
    default: "javascript:void(0)"
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
