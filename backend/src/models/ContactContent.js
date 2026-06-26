import mongoose from "mongoose";

const contactContentSchema = new mongoose.Schema(
  {
    heroEyebrow: { type: String, default: "" },
    heroHeading: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    officeName: { type: String, default: "" },
    officeAddress: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    whatsappTitle: { type: String, default: "" },
    whatsappDescription: { type: String, default: "" },
    businessHours: { type: String, default: "" },
    formTitle: { type: String, default: "" },
    formDescription: { type: String, default: "" },
    formSubjects: { type: [String], default: [] }
  },
  {
    timestamps: true,
    collection: "contact_content"
  }
);

const ContactContent = mongoose.model("ContactContent", contactContentSchema);

export default ContactContent;
