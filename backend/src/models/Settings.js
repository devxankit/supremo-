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
    default: ""
  },
  contactPhone: {
    type: String,
    default: ""
  },
  contactEmail: {
    type: String,
    default: ""
  },
  contactAddress: {
    type: String,
    default: ""
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
    default: ""
  }
}, {
  timestamps: true,
  collection: "settings"
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
