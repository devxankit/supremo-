import JourneyContent from "../models/JourneyContent.js";

// Seed default Journey Content automatically on server start
export const seedJourneyContent = async () => {
  try {
    const journeyExists = await JourneyContent.findOne();
    if (!journeyExists) {
      await JourneyContent.create({});
      console.log("Default Journey Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding journey content: ${error.message}`);
  }
};

// @desc    Get active Journey Content configuration
// @route   GET /api/journey
// @access  Public
export const getJourneyContent = async (req, res, next) => {
  try {
    let journey = await JourneyContent.findOne();
    if (!journey) {
      journey = await JourneyContent.create({});
    }
    res.json(journey);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Journey Content configuration
// @route   PUT /api/journey
// @access  Private (Admin)
export const updateJourneyContent = async (req, res, next) => {
  try {
    let journey = await JourneyContent.findOne();
    if (!journey) {
      journey = new JourneyContent({});
    }

    const fields = ["heading", "sub", "images", "milestones"];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        journey[field] = req.body[field];
      }
    });

    const updatedJourney = await journey.save();
    res.json(updatedJourney);
  } catch (error) {
    next(error);
  }
};
