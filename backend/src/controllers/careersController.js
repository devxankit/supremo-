import CareersContent from "../models/CareersContent.js";

// Seed default Careers content automatically on server start if not present
export const seedCareersContent = async () => {
  try {
    const exists = await CareersContent.findOne();
    if (!exists) {
      await CareersContent.create({
        heroEyebrow: "",
        heroHeading: "",
        heroDescription: "",
        introEyebrow: "",
        introHeading: "",
        introDescription: "",
        introList: ["", "", ""],
        areasOfInterest: []
      });
      console.log("Default Careers Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding careers content: ${error.message}`);
  }
};

// @desc    Get Careers Content configuration
// @route   GET /api/careers
// @access  Public
export const getCareersContent = async (req, res, next) => {
  try {
    let content = await CareersContent.findOne();
    if (!content) {
      content = await CareersContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Careers Content configuration
// @route   PUT /api/careers
// @access  Private (Admin)
export const updateCareersContent = async (req, res, next) => {
  try {
    let content = await CareersContent.findOne();
    if (!content) {
      content = new CareersContent({});
    }

    const fields = [
      "heroEyebrow",
      "heroHeading",
      "heroDescription",
      "introEyebrow",
      "introHeading",
      "introDescription",
      "introList",
      "areasOfInterest"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
      }
    });

    const updated = await content.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
