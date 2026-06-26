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
    heading: { type: String, default: "Why Supremo" },
    sub: {
      type: String,
      default: "Quality, reach and support that grows your business.",
    },
    cards: {
      type: [whyUsCardSchema],
      default: [
        {
          title: "Triple-Layer Protection",
          description:
            "Co-extruded layers keep water cooler, safer, and algae-free.",
          iconKey: "shield",
          highlightType: "tags",
          tags: [
            { label: "UV Shield", color: "blue" },
            { label: "Anti-Algae", color: "dark" },
            { label: "FDA LLDPE", color: "green" },
          ],
        },
        {
          title: "ISI Standards",
          description: "IS 12701 & IS 4985 certified products.",
          iconKey: "certified",
          highlightType: "badge",
          badgeText: "ISO 9001:2015 AUDITED",
        },
        {
          title: "10-Year Warranty",
          description: "Long-term peace of mind on all purchases.",
          iconKey: "warranty",
          highlightType: "stat",
          statValue: "10 Yrs",
          statLabel: "Coverage Warranty",
          statColor: "var(--blue-600)",
        },
        {
          title: "Supply Chain",
          description: "Pan-India logistics with regional plants and depots.",
          iconKey: "supply",
          highlightType: "tags",
          tags: [
            { label: "4 Plants", color: "dark" },
            { label: "9 Depots", color: "dark" },
          ],
        },
        {
          title: "Digital Portal",
          description:
            "Real-time tracking and online ordering for all dealers.",
          iconKey: "portal",
          highlightType: "order",
          orderLabel: "Order #784",
          orderStatus: "IN TRANSIT",
        },
        {
          title: "Support SLA",
          description: "Dedicated assistance for seamless resolution.",
          iconKey: "support",
          highlightType: "stat",
          statValue: "6 Hrs",
          statLabel: "Resolution SLA",
          statColor: "var(--ok)",
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: "why_us_content",
  }
);

const WhyUsContent = mongoose.model("WhyUsContent", whyUsContentSchema);

export default WhyUsContent;
