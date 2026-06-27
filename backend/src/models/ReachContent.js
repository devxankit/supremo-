import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  info: { type: String, default: "" },
  isHQ: { type: Boolean, default: false },
});

const reachContentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "",
    },
    sub: {
      type: String,
      default: "",
    },
    locations: {
      type: [locationSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "reach_content",
  }
);

const ReachContent = mongoose.model("ReachContent", reachContentSchema);

export default ReachContent;
