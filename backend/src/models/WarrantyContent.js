import mongoose from "mongoose";

const warrantyContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Returns & Warranty"
    },
    intro: {
      type: String,
      default: "Learn about our product return policy and warranty coverage."
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
