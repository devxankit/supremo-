import ContactContent from "../models/ContactContent.js";

// Seed default Contact content on server start if not present
export const seedContactContent = async () => {
  try {
    const exists = await ContactContent.findOne();
    if (!exists) {
      await ContactContent.create({
        heroEyebrow: "",
        heroHeading: "",
        heroDescription: "",
        officeName: "",
        officeAddress: "",
        phone: "",
        email: "",
        whatsapp: "",
        whatsappTitle: "",
        whatsappDescription: "",
        businessHours: "",
        formTitle: "",
        formDescription: "",
        formSubjects: []
      });
      console.log("Default Contact Content initialized with empty values.");
    }
  } catch (error) {
    console.error(`Error seeding contact content: ${error.message}`);
  }
};

// @desc    Get Contact Content settings
// @route   GET /api/contact
// @access  Public
export const getContactContent = async (req, res, next) => {
  try {
    let content = await ContactContent.findOne();
    if (!content) {
      content = await ContactContent.create({
        heroEyebrow: "",
        heroHeading: "",
        heroDescription: "",
        officeName: "",
        officeAddress: "",
        phone: "",
        email: "",
        whatsapp: "",
        whatsappTitle: "",
        whatsappDescription: "",
        businessHours: "",
        formTitle: "",
        formDescription: "",
        formSubjects: []
      });
    }
    res.json(content);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Contact Content settings
// @route   PUT /api/contact
// @access  Private (Admin)
export const updateContactContent = async (req, res, next) => {
  try {
    let content = await ContactContent.findOne();
    if (!content) {
      content = new ContactContent({});
    }

    const fields = [
      "heroEyebrow",
      "heroHeading",
      "heroDescription",
      "officeName",
      "officeAddress",
      "phone",
      "email",
      "whatsapp",
      "whatsappTitle",
      "whatsappDescription",
      "businessHours",
      "formTitle",
      "formDescription",
      "formSubjects"
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
