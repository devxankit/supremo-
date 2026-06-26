import PrivacyContent from "../models/PrivacyContent.js";

// Seed default Privacy content on startup if not present
export const seedPrivacyContent = async () => {
  try {
    const exists = await PrivacyContent.findOne();
    if (!exists) {
      await PrivacyContent.create({
        title: "Privacy Policy",
        intro: "",
        sections: []
      });
      console.log("Default Privacy Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding privacy content: ${error.message}`);
  }
};

// @desc    Get Privacy Content settings
// @route   GET /api/privacy
// @access  Public
export const getPrivacyContent = async (req, res, next) => {
  try {
    let content = await PrivacyContent.findOne();
    if (!content) {
      content = await PrivacyContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Privacy Content settings
// @route   PUT /api/privacy
// @access  Private (Admin)
export const updatePrivacyContent = async (req, res, next) => {
  try {
    let content = await PrivacyContent.findOne();
    if (!content) {
      content = new PrivacyContent({});
    }

    if (req.body.title !== undefined) content.title = req.body.title;
    if (req.body.intro !== undefined) content.intro = req.body.intro;
    if (req.body.sections !== undefined) content.sections = req.body.sections;

    const updated = await content.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
