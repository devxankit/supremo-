import mongoose from "mongoose";

const careersContentSchema = new mongoose.Schema(
  {
    heroEyebrow: { type: String },
    heroHeading: { type: String },
    heroDescription: { type: String },
    introEyebrow: { type: String },
    introHeading: { type: String },
    introDescription: { type: String },
    introList: { type: [String] },
    areasOfInterest: { type: [String] }
  },
  {
    timestamps: true,
    collection: "careers_content"
  }
);

const CareersContent = mongoose.model("CareersContent", careersContentSchema);

export default CareersContent;
