import WhyUsContent from "../models/WhyUsContent.js";

// Seed default Why Us Content on server start
export const seedWhyUsContent = async () => {
  try {
    const exists = await WhyUsContent.findOne();
    if (!exists) {
      await WhyUsContent.create({});
      console.log("Default Why Us Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding why-us content: ${error.message}`);
  }
};

// @desc    Get Why Us Content
// @route   GET /api/why-us
// @access  Public
export const getWhyUsContent = async (req, res, next) => {
  try {
    let content = await WhyUsContent.findOne();
    if (!content) {
      content = await WhyUsContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Why Us Content
// @route   PUT /api/why-us
// @access  Private (Admin)
export const updateWhyUsContent = async (req, res, next) => {
  try {
    let content = await WhyUsContent.findOne();
    if (!content) {
      content = new WhyUsContent({});
    }

    const fields = ["heading", "sub", "cards"];
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
