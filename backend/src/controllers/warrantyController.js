import WarrantyContent from "../models/WarrantyContent.js";

// Seed default Warranty content on startup if not present
export const seedWarrantyContent = async () => {
  try {
    const exists = await WarrantyContent.findOne();
    if (!exists) {
      await WarrantyContent.create({
        title: "Returns & Warranty",
        intro: "",
        sections: []
      });
      console.log("Default Warranty Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding warranty content: ${error.message}`);
  }
};

// @desc    Get Warranty Content settings
// @route   GET /api/warranty
// @access  Public
export const getWarrantyContent = async (req, res, next) => {
  try {
    let content = await WarrantyContent.findOne();
    if (!content) {
      content = await WarrantyContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Warranty Content settings
// @route   PUT /api/warranty
// @access  Private (Admin)
export const updateWarrantyContent = async (req, res, next) => {
  try {
    let content = await WarrantyContent.findOne();
    if (!content) {
      content = new WarrantyContent({});
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
