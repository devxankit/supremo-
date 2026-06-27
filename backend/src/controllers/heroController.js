import HeroContent from "../models/HeroContent.js";

// Seed default Hero content automatically on server start
export const seedHeroContent = async () => {
  try {
    const heroExists = await HeroContent.findOne();
    if (!heroExists) {
      await HeroContent.create({});
      console.log("Default Hero Content seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding hero content: ${error.message}`);
  }
};

// @desc    Get active Hero Content configuration
// @route   GET /api/hero
// @access  Public
export const getHeroContent = async (req, res, next) => {
  try {
    let hero = await HeroContent.findOne();
    if (!hero) {
      hero = await HeroContent.create({});
    }
    res.json(hero);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Hero Content configuration
// @route   PUT /api/hero
// @access  Private (Admin)
export const updateHeroContent = async (req, res, next) => {
  try {
    let hero = await HeroContent.findOne();
    if (!hero) {
      hero = new HeroContent({});
    }

    const fields = [
      "bgType",
      "videoUrl",
      "videoName",
      "imageUrl",
      "imageName",
      "overlayDark",
      "align",
      "showEyebrow",
      "eyebrow",
      "heading",
      "headingAccent",
      "showSub",
      "sub",
      "showPrimary",
      "primaryLabel",
      "primaryLink",
      "showSecondary",
      "secondaryLabel",
      "secondaryLink",
      "showScrollCue",
      "feature1Title",
      "feature1Desc",
      "feature2Title",
      "feature2Desc",
      "feature3Title",
      "feature3Desc",
      "feature4Title",
      "feature4Desc",
      "feature5Title",
      "feature5Desc"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        hero[field] = req.body[field];
      }
    });

    const updatedHero = await hero.save();
    res.json(updatedHero);
  } catch (error) {
    next(error);
  }
};
