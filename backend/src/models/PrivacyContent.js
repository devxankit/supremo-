import mongoose from "mongoose";

const privacyContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Privacy Policy"
    },
    intro: {
      type: String,
      default: "We value your privacy. This policy details how we handle your personal data."
    },
    sections: {
      type: [
        {
          title: { type: String, default: "" },
          content: { type: String, default: "" }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true,
    collection: "privacy_content"
  }
);

const PrivacyContent = mongoose.model("PrivacyContent", privacyContentSchema);

export default PrivacyContent;
