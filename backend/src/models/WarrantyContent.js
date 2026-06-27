import mongoose from "mongoose";

const warrantyContentSchema = new mongoose.Schema(
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
    collection: "warranty_content"
  }
);

const WarrantyContent = mongoose.model("WarrantyContent", warrantyContentSchema);

export default WarrantyContent;
