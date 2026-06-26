import mongoose from "mongoose";

const aboutContentSchema = new mongoose.Schema({
  eyebrow: {
    type: String,
    default: "Why Supremo"
  },
  heading: {
    type: String,
    default: "Born in Indore, India."
  },
  headingHighlight: {
    type: String,
    default: "Trusted across the nation."
  },
  text1: {
    type: String,
    default: "Supremo stands for innovation and reliability in polymer manufacturing. Since 1999, we have grown from a single blow-moulding unit into four plants and 22 production lines — engineering water tanks, pipes, planters and utility products that meet the highest quality standards."
  },
  text2: {
    type: String,
    default: "Guided by our belief that \"Innovation is the Key\", every product is built to outlast expectations and serve India's homes, farms and businesses for a generation."
  },
  imageUrl: {
    type: String,
    default: "/images/DJI_0695.jpg"
  },
  imageCaption: {
    type: String,
    default: "Supremo Plant · Indore, Madhya Pradesh"
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
    default: "Welcome and thank you for showing your interest and faith in this journey of ours, and help us making 'Supremo' a trusted and reputed brand."
  },
  directorText2: {
    type: String,
    default: "Our Company purpose is to offer innovative products and client centric services backed up by strong infrastructure and dedicated team which has led us making 'Supremo' as an emerging brand. This purpose has been evident since the establishment of our corporation, When we set out to build a premium brand with an eye on innovation."
  },
  directorText3: {
    type: String,
    default: "The values we share are embodied in what goes on at Supremo from day to day. Team members must exhibit ethical and honest behavior, and Supremo must offer fair, equal conduct in a safe, healthy workplace. We believe that in such an environment, sound decision making and effective strategies flow naturally from the give-and-take of daily business engagements among all team members."
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
