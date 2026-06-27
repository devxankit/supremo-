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
      default: "",
    },
    headingHighlight: {
      type: String,
      default: "",
    },
    sub: {
      type: String,
      default: "",
    },
    tagLine: {
      type: String,
      default: "",
    },
    cards: {
      type: [dealerNetworkCardSchema],
      default: [],
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
