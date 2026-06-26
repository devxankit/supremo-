import mongoose from "mongoose";

const dealershipContentSchema = new mongoose.Schema(
  {
    heroEyebrow: { type: String },
    heroHeading: { type: String },
    heroHeadingHighlight: { type: String },
    heroSub: { type: String },
    heroImage: { type: String },
    
    whyEyebrow: { type: String },
    whyHeading: { type: String },
    offers: {
      type: [
        {
          key: { type: String, required: true },
          title: { type: String },
          description: { type: String }
        }
      ]
    },

    applyEyebrow: { type: String },
    applyHeading: { type: String },
    applyDescription: { type: String },
    benefits: {
      type: [String]
    },
    asideEyebrow: { type: String },
    asideHeading: { type: String },
    asideDescription: { type: String },
    steps: {
      type: [
        {
          n: { type: String },
          title: { type: String },
          desc: { type: String }
        }
      ]
    },
    faqs: {
      type: [
        {
          q: { type: String },
          a: { type: String }
        }
      ]
    },
    productInterests: {
      type: [String]
    }
  },
  {
    timestamps: true,
    collection: "dealership_content"
  }
);

const DealershipContent = mongoose.model("DealershipContent", dealershipContentSchema);

export default DealershipContent;
