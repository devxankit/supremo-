import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  }
});

const journeyContentSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: ""
  },
  sub: {
    type: String,
    default: ""
  },
  images: {
    type: [String],
    default: []
  },
  milestones: {
    type: [milestoneSchema],
    default: []
  }
}, {
  timestamps: true,
  collection: "journey_content"
});

const JourneyContent = mongoose.model("JourneyContent", journeyContentSchema);

export default JourneyContent;
