import DealerNetworkContent from "../models/DealerNetworkContent.js";

// Seed default Dealer Network Content on server start
export const seedDealerNetworkContent = async () => {
  try {
    const exists = await DealerNetworkContent.findOne();
    if (!exists) {
      await DealerNetworkContent.create({});
      console.log("Default Dealer Network Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding dealer network content: ${error.message}`);
  }
};

// @desc    Get Dealer Network Content
// @route   GET /api/dealer-network
// @access  Public
export const getDealerNetworkContent = async (req, res, next) => {
  try {
    let content = await DealerNetworkContent.findOne();
    if (!content) {
      content = await DealerNetworkContent.create({});
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Dealer Network Content
// @route   PUT /api/dealer-network
// @access  Private (Admin)
export const updateDealerNetworkContent = async (req, res, next) => {
  try {
    let content = await DealerNetworkContent.findOne();
    if (!content) {
      content = new DealerNetworkContent({});
    }

    const fields = ["heading", "headingHighlight", "sub", "tagLine", "cards"];
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
