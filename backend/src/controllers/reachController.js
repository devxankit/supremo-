import ReachContent from "../models/ReachContent.js";

// Seed default Reach Content on server start
export const seedReachContent = async () => {
  try {
    const exists = await ReachContent.findOne();
    if (!exists) {
      await ReachContent.create({});
      console.log("Default Reach Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding reach content: ${error.message}`);
  }
};

// @desc    Get Reach Content
// @route   GET /api/reach
// @access  Public
export const getReachContent = async (req, res, next) => {
  try {
    let content = await ReachContent.findOne();
    if (!content) {
      content = await ReachContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Reach Content
// @route   PUT /api/reach
// @access  Private (Admin)
export const updateReachContent = async (req, res, next) => {
  try {
    let content = await ReachContent.findOne();
    if (!content) {
      content = new ReachContent({});
    }

    const fields = ["heading", "sub", "locations"];
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
