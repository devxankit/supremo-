import mongoose from "mongoose";

const termsContentSchema = new mongoose.Schema(
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
    collection: "terms_content"
  }
);

const TermsContent = mongoose.model("TermsContent", termsContentSchema);

export default TermsContent;
