import mongoose from "mongoose";

const pageVisitSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  ip: {
    type: String
  },
  userAgent: {
    type: String
  },
  referrer: {
    type: String
  }
}, {
  timestamps: true
});

const PageVisit = mongoose.model("PageVisit", pageVisitSchema);

export default PageVisit;
