import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },
    areaOfInterest: {
      type: String,
      required: [true, "Area of interest is required"],
      trim: true
    },
    resume: {
      type: String,
      required: [true, "Resume is required"],
      trim: true
    },
    message: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["New", "Pending", "Active", "Inactive", "Rejected", "Replied"],
      default: "New"
    }
  },
  {
    timestamps: true,
    collection: "career_applications"
  }
);

const CareerApplication = mongoose.model("CareerApplication", careerApplicationSchema);

export default CareerApplication;
