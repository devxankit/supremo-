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
      default: "A pan-India presence, serving communities across 22 states.",
    },
    sub: {
      type: String,
      default:
        "Supremo reaches every corner of the country through an extensive network of exclusive-territory dealers, backed by strategically located manufacturing plants and regional warehouses to enforce our strict 48-hour dispatch guarantee.",
    },
    locations: {
      type: [locationSchema],
      default: [
        { name: "Punjab", x: 151.2, y: 157.2, info: "Active Sales & Distribution Network" },
        { name: "Chandigarh", x: 179.6, y: 160, info: "UT Logistics & Supply Hub" },
        { name: "Uttarakhand", x: 230.5, y: 173.9, info: "Territory Sales & Distribution Hub" },
        { name: "Haryana", x: 170.5, y: 196.9, info: "Regional Sales & Distribution Network" },
        { name: "Delhi", x: 186.8, y: 210.4, info: "Regional Sales HQ & Corporate Hub" },
        { name: "Rajasthan", x: 118.5, y: 258.6, info: "Jaipur Warehouse & Regional Sales Office" },
        { name: "Uttar Pradesh", x: 258.8, y: 250.6, info: "Ghaziabad Manufacturing Plant & 3 Warehouses" },
        { name: "Bihar", x: 364.6, y: 280.2, info: "Patna Warehouse & Sales Office" },
        { name: "Jharkhand", x: 363.7, y: 326.9, info: "Ranchi Distribution Center" },
        { name: "Gujarat", x: 71.6, y: 348.8, info: "Surat Manufacturing Plant & Regional Office" },
        { name: "Madhya Pradesh", x: 200, y: 338, info: "Indore HQ & Main Roto-Moulding Plant", isHQ: true },
        { name: "Chhattisgarh", x: 290, y: 380.8, info: "Raipur Distribution Center" },
        { name: "Odisha", x: 339.8, y: 398.1, info: "Bhubaneswar Warehouse & Supply Hub" },
        { name: "Maharashtra", x: 166, y: 421.5, info: "Pune Manufacturing Plant & Regional Office" },
        { name: "Telangana", x: 227.6, y: 458.4, info: "Hyderabad Warehouse & Regional Office" },
        { name: "Andhra Pradesh", x: 271.1, y: 495.1, info: "Vijayawada Logistics Center" },
        { name: "Goa", x: 122.9, y: 511.8, info: "Coastal Sales & Distribution Network" },
        { name: "Karnataka", x: 167, y: 525.6, info: "Bengaluru Warehouse & Regional Office" },
        { name: "Kerala", x: 171.9, y: 617.1, info: "Cochin Distribution Point" },
        { name: "Tamil Nadu", x: 213.9, y: 605.3, info: "Chennai Warehouse & Regional Office" },
      ],
    },
  },
  {
    timestamps: true,
    collection: "reach_content",
  }
);

const ReachContent = mongoose.model("ReachContent", reachContentSchema);

export default ReachContent;
