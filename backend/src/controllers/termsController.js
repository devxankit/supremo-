import TermsContent from "../models/TermsContent.js";

// Seed default Terms content on startup if not present
export const seedTermsContent = async () => {
  try {
    const exists = await TermsContent.findOne();
    if (!exists) {
      await TermsContent.create({
        title: "Terms & Conditions",
        intro: "",
        sections: []
      });
      console.log("Default Terms Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding terms content: ${error.message}`);
  }
};

// @desc    Get Terms Content settings
// @route   GET /api/terms
// @access  Public
export const getTermsContent = async (req, res, next) => {
  try {
    let content = await TermsContent.findOne();
    if (!content) {
      content = await TermsContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Terms Content settings
// @route   PUT /api/terms
// @access  Private (Admin)
export const updateTermsContent = async (req, res, next) => {
  try {
    let content = await TermsContent.findOne();
    if (!content) {
      content = new TermsContent({});
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
