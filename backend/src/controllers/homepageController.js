import HomepageSection from "../models/HomepageSection.js";

const defaultSections = [
  { id: "hero", name: "Hero Section", desc: "Full-screen video banner with headline & CTAs", visible: true, locked: true, href: "/admin/content/hero", order: 1 },
  { id: "categories", name: "Featured Categories", desc: "Grid of product category cards", visible: true, heading: "", sub: "", order: 2 },
  { id: "manufacturing", name: "Journey", desc: "Factory process & capability showcase", visible: true, locked: true, href: "/admin/content/journey", order: 3 },
  { id: "whyus", name: "Why Supremo", desc: "Differentiators / value props grid", visible: true, heading: "", sub: "", order: 4 },
  { id: "intro", name: "Reach", desc: "Short company introduction with key stats", visible: true, heading: "", sub: "", order: 5 },
  { id: "testimonials", name: "Trusted by leading Indian manufacturers", desc: "Customer & dealer quotes carousel", visible: true, heading: "", sub: "", order: 6 },
  { id: "dealercta", name: "Dealer Network", desc: "Become-a-dealer banner with form", visible: true, heading: "", sub: "", order: 7 },
  { id: "certifications", name: "Certifications & Standards", desc: "ISI / ISO certification logos band", visible: true, heading: "", sub: "", order: 8 },
  { id: "bigcta", name: "Become a Partner", desc: "Final call-to-action before footer", visible: true, heading: "", headingHighlight: "", sub: "", phone: "+91 90- 9898-9090", order: 9 }
];

// Seed default Homepage Sections automatically on server start
export const seedHomepageSections = async () => {
  try {
    const sectionCount = await HomepageSection.countDocuments();
    if (sectionCount === 0) {
      await HomepageSection.insertMany(defaultSections);
      console.log("Default Homepage Sections seeded successfully.");
    }
  } catch (error) {
    console.error(`Error seeding homepage sections: ${error.message}`);
  }
};

// @desc    Get all homepage sections ordered by 'order'
// @route   GET /api/homepage-sections
// @access  Public
export const getHomepageSections = async (req, res, next) => {
  try {
    let sections = await HomepageSection.find().sort({ order: 1 });
    if (sections.length === 0) {
      await seedHomepageSections();
      sections = await HomepageSection.find().sort({ order: 1 });
    }
    res.json(sections);
  } catch (error) {
    next(error);
  }
};

// @desc    Batch update homepage sections
// @route   PUT /api/homepage-sections
// @access  Private (Admin)
export const updateHomepageSections = async (req, res, next) => {
  try {
    const updatedSections = req.body;
    if (!Array.isArray(updatedSections)) {
      return res.status(400).json({ message: "Invalid payload: expected array of sections" });
    }

    // Process each section and update visible, heading, sub, and phone
    for (const sec of updatedSections) {
      await HomepageSection.findOneAndUpdate(
        { id: sec.id },
        {
          $set: {
            visible: sec.visible,
            heading: sec.heading,
            headingHighlight: sec.headingHighlight,
            sub: sec.sub,
            phone: sec.phone
          }
        }
      );
    }

    const sections = await HomepageSection.find().sort({ order: 1 });
    res.json(sections);
  } catch (error) {
    next(error);
  }
};
