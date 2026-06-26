import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  // Notifications
  newInquiryAlerts: {
    type: Boolean,
    default: true
  },
  dealerApplicationAlerts: {
    type: Boolean,
    default: true
  },
  lowStockAlerts: {
    type: Boolean,
    default: false
  },


  // Website Settings
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  footerAboutText: {
    type: String,
    default: "Manufacturer of premium water tanks, PVC pipes, planters and commercial plastic products. Pan-India dealer network, four ISO-certified plants."
  },
  contactPhone: {
    type: String,
    default: "+91 90989 89090"
  },
  contactEmail: {
    type: String,
    default: "info@supremo.in"
  },
  contactAddress: {
    type: String,
    default: "Plot 14, Industrial Area, Indore, MP 452015"
  },
  socialFacebook: {
    type: String,
    default: ""
  },
  socialInstagram: {
    type: String,
    default: ""
  },
  socialLinkedin: {
    type: String,
    default: ""
  },
  socialYoutube: {
    type: String,
    default: ""
  },
  socialFacebookVisible: {
    type: Boolean,
    default: false
  },
  socialInstagramVisible: {
    type: Boolean,
    default: false
  },
  socialLinkedinVisible: {
    type: Boolean,
    default: false
  },
  socialYoutubeVisible: {
    type: Boolean,
    default: false
  },
  footerCopyright: {
    type: String,
    default: "© 2026 Supremo Polymers Pvt. Ltd. All rights reserved."
  }
}, {
  timestamps: true,
  collection: "settings"
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
