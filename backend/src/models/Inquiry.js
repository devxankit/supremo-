import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["generic", "dealer", "product"],
    default: "generic"
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  
  // Specific Dealership / B2B Fields
  businessName: {
    type: String,
    trim: true
  },
  cityState: {
    type: String,
    trim: true
  },
  existingBusinessType: {
    type: String,
    trim: true
  },
  investmentCapacity: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  products: {
    type: String,
    trim: true
  },
  visitingCard: {
    type: String,
    trim: true
  },
  
  status: {
    type: String,
    enum: ["New", "Replied", "Pending", "Closed", "Active", "Inactive", "Rejected"],
    default: "New"
  }
}, {
  timestamps: true
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
