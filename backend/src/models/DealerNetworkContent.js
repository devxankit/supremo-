import mongoose from "mongoose";

const dealerNetworkCardSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  states: { type: String, default: "" },
  accent: { type: String, default: "#6E97F2" },
});

const dealerNetworkContentSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "A pan-India network,",
    },
    headingHighlight: {
      type: String,
      default: "built on reliability.",
    },
    sub: {
      type: String,
      default: "From metro distributors to rural hardware outlets — protected territories, stocked regional hubs, and a team that picks up the phone.",
    },
    tagLine: {
      type: String,
      default: "Live across four regions",
    },
    cards: {
      type: [dealerNetworkCardSchema],
      default: [
        {
          name: "North",
          states: "Delhi · Punjab · Haryana · UP · Rajasthan",
          accent: "#6E97F2",
        },
        {
          name: "West",
          states: "Maharashtra · Gujarat · MP · Goa",
          accent: "#10B981",
        },
        {
          name: "South",
          states: "Karnataka · Telangana · Tamil Nadu · Kerala",
          accent: "#F59E0B",
        },
        {
          name: "East",
          states: "West Bengal · Odisha · Bihar · Jharkhand",
          accent: "#8B5CF6",
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: "dealer_network_content",
  }
);

const DealerNetworkContent = mongoose.model(
  "DealerNetworkContent",
  dealerNetworkContentSchema
);

export default DealerNetworkContent;
