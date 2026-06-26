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
    default: "27 years, one consistent direction."
  },
  sub: {
    type: String,
    default: "Journey"
  },
  images: {
    type: [String],
    default: []
  },
  milestones: {
    type: [milestoneSchema],
    default: [
      { year: "1999", event: "Founded in Indore, Madhya Pradesh with the first blow-moulding unit." },
      { year: "2003", event: "Launched first rotomoulding plant — expanded into large-format tank production." },
      { year: "2008", event: "Received ISI certification (IS 12701) for triple-layer water tanks." },
      { year: "2013", event: "Expanded to three plants; entered PVC pipe extrusion with IS 4985 certification." },
      { year: "2018", event: "Achieved ISO 9001:2015 certification across all manufacturing units." },
      { year: "2022", event: "Crossed 1,000 active dealers in 22 states; launched the Dealer Digital Portal." },
      { year: "2026", event: "27th year of operations. Four plants, 22 production lines, 68,000 L/day capacity." }
    ]
  }
}, {
  timestamps: true,
  collection: "journey_content"
});

const JourneyContent = mongoose.model("JourneyContent", journeyContentSchema);

export default JourneyContent;
