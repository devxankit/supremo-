import mongoose from "mongoose";

const privacyContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: ""
    },
    intro: {
      type: String,
      default: ""
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
