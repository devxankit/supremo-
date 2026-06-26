import mongoose from "mongoose";

const contactApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["New", "Pending", "Closed", "Replied"],
      default: "New"
    }
  },
  {
    timestamps: true,
    collection: "contact_applications"
  }
);

const ContactApplication = mongoose.model("ContactApplication", contactApplicationSchema);

export default ContactApplication;
