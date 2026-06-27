import mongoose from "mongoose";

const whyUsCardSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  // icon key references a predefined icon in the frontend (shield, certified, warranty, supply, portal, support)
  iconKey: { type: String, default: "shield" },
  // badge/stat area — flexible key-value pairs displayed as small tag chips or a stat number
  // type can be: "tags" (array of { label, color }), "stat" (big number + label), "badge" (centered text chip), "order" (mock order row)
  highlightType: {
    type: String,
    enum: ["tags", "stat", "badge", "order"],
    default: "badge",
  },
  // For type "tags": array of { label, color? }
  tags: {
    type: [{ label: String, color: String }],
    default: [],
  },
  // For type "stat": big display number + label text
  statValue: { type: String, default: "" },
  statLabel: { type: String, default: "" },
  statColor: { type: String, default: "var(--blue-600)" },
  // For type "badge": centered text chip
  badgeText: { type: String, default: "" },
  // For type "order": left label + right status
  orderLabel: { type: String, default: "" },
  orderStatus: { type: String, default: "" },
});

const whyUsContentSchema = new mongoose.Schema(
  {
    heading: { type: String, default: "" },
    sub: {
      type: String,
      default: "",
    },
    cards: {
      type: [whyUsCardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "why_us_content",
  }
);

const WhyUsContent = mongoose.model("WhyUsContent", whyUsContentSchema);

export default WhyUsContent;
