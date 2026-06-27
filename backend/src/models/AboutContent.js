import mongoose from "mongoose";

const aboutContentSchema = new mongoose.Schema({
  eyebrow: {
    type: String,
    default: ""
  },
  heading: {
    type: String,
    default: ""
  },
  headingHighlight: {
    type: String,
    default: ""
  },
  text1: {
    type: String,
    default: ""
  },
  text2: {
    type: String,
    default: ""
  },
  imageUrl: {
    type: String,
    default: ""
  },
  imageCaption: {
    type: String,
    default: ""
  },
  stats: {
    type: [{
      value: { type: Number, required: true },
      suffix: { type: String, default: "" },
      label: { type: String, required: true }
    }],
    default: []
  },
  directorTitle: {
    type: String,
    default: ""
  },
  directorText1: {
    type: String,
    default: ""
  },
  directorText2: {
    type: String,
    default: ""
  },
  directorText3: {
    type: String,
    default: ""
  },
  directorImageUrl: {
    type: String,
    default: ""
  },
  mfgEyebrow: {
    type: String,
    default: ""
  },
  mfgHeading: {
    type: String,
    default: ""
  },
  mfgDescription: {
    type: String,
    default: ""
  },
  mfgCards: {
    type: [{
      image: { type: String, default: "" },
      title: { type: String, default: "" },
      sub: { type: String, default: "" }
    }],
    default: []
  },
  certEyebrow: {
    type: String,
    default: ""
  },
  certTitle: {
    type: String,
    default: ""
  },
  certDescription: {
    type: String,
    default: ""
  },
  certImageUrl: {
    type: String,
    default: ""
  },
  certificates: {
    type: [{
      image: { type: String, default: "" },
      title: { type: String, default: "" }
    }],
    default: []
  }
}, {
  timestamps: true,
  collection: "about_content"
});

const AboutContent = mongoose.model("AboutContent", aboutContentSchema);

export default AboutContent;
