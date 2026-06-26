import Settings from "../models/Settings.js";

// Seed default settings automatically
export const seedSettings = async () => {
  try {
    const settingsExists = await Settings.findOne();
    if (!settingsExists) {
      await Settings.create({});
      console.log("Default system settings seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding settings: ${error.message}`);
  }
};

// @desc    Get system settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update system settings
// @route   PUT /api/settings
// @access  Private (Admin)
export const updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    const fields = [
      "newInquiryAlerts",
      "dealerApplicationAlerts",
      "lowStockAlerts",
      "maintenanceMode",
      "footerAboutText",
      "contactPhone",
      "contactEmail",
      "contactAddress",
      "socialFacebook",
      "socialInstagram",
      "socialLinkedin",
      "socialYoutube",
      "socialFacebookVisible",
      "socialInstagramVisible",
      "socialLinkedinVisible",
      "socialYoutubeVisible",
      "footerCopyright"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    next(error);
  }
};

