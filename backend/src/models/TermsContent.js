import mongoose from "mongoose";

const termsContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Terms & Conditions"
    },
    intro: {
      type: String,
      default: "Please read these terms and conditions carefully before using our website."
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
    collection: "terms_content"
  }
);

const TermsContent = mongoose.model("TermsContent", termsContentSchema);

export default TermsContent;
