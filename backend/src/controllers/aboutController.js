import AboutContent from "../models/AboutContent.js";

// Seed default About content automatically on server start
export const seedAboutContent = async () => {
  try {
    const aboutExists = await AboutContent.findOne();
    if (!aboutExists) {
      await AboutContent.create({});
      console.log("Default About Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding about content: ${error.message}`);
  }
};

// @desc    Get active About Content configuration
// @route   GET /api/about
// @access  Public
export const getAboutContent = async (req, res, next) => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = await AboutContent.create({});
    }
    res.json(about);
  } catch (error) {
    next(error);
  }
};

// @desc    Update About Content configuration
// @route   PUT /api/about
// @access  Private (Admin)
export const updateAboutContent = async (req, res, next) => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = new AboutContent({});
    }

    const fields = [
      "eyebrow",
      "heading",
      "headingHighlight",
      "text1",
      "text2",
      "imageUrl",
      "imageCaption",
      "stats",
      "directorTitle",
      "directorText1",
      "directorText2",
      "directorText3",
      "directorImageUrl",
      "mfgEyebrow",
      "mfgHeading",
      "mfgDescription",
      "mfgCards",
      "certEyebrow",
      "certTitle",
      "certDescription",
      "certImageUrl",
      "certificates"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        about[field] = req.body[field];
      }
    });

    const updatedAbout = await about.save();
    res.json(updatedAbout);
  } catch (error) {
    next(error);
  }
};
