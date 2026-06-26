import DealershipContent from "../models/DealershipContent.js";

// Seed default Dealership content automatically on server start if not present
export const seedDealershipContent = async () => {
  try {
    const exists = await DealershipContent.findOne();
    if (!exists) {
      await DealershipContent.create({
        heroEyebrow: "",
        heroHeading: "",
        heroHeadingHighlight: "",
        heroSub: "",
        heroImage: "",
        whyEyebrow: "",
        whyHeading: "",
        offers: [],
        applyEyebrow: "",
        applyHeading: "",
        applyDescription: "",
        benefits: [],
        asideEyebrow: "",
        asideHeading: "",
        asideDescription: "",
        steps: [],
        faqs: [],
        productInterests: []
      });
      console.log("Default Dealership Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding dealership content: ${error.message}`);
  }
};

// @desc    Get Dealership Content configuration
// @route   GET /api/dealership
// @access  Public
export const getDealershipContent = async (req, res, next) => {
  try {
    let content = await DealershipContent.findOne();
    if (!content) {
      content = await DealershipContent.create({
        heroEyebrow: "",
        heroHeading: "",
        heroHeadingHighlight: "",
        heroSub: "",
        heroImage: "",
        whyEyebrow: "",
        whyHeading: "",
        offers: [],
        applyEyebrow: "",
        applyHeading: "",
        applyDescription: "",
        benefits: [],
        asideEyebrow: "",
        asideHeading: "",
        asideDescription: "",
        steps: [],
        faqs: [],
        productInterests: []
      });
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Dealership Content configuration
// @route   PUT /api/dealership
// @access  Private (Admin)
export const updateDealershipContent = async (req, res, next) => {
  try {
    let content = await DealershipContent.findOne();
    if (!content) {
      content = new DealershipContent({});
    }

    const fields = [
      "heroEyebrow",
      "heroHeading",
      "heroHeadingHighlight",
      "heroSub",
      "heroImage",
      "whyEyebrow",
      "whyHeading",
      "offers",
      "applyEyebrow",
      "applyHeading",
      "applyDescription",
      "benefits",
      "asideEyebrow",
      "asideHeading",
      "asideDescription",
      "steps",
      "faqs",
      "productInterests"
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
