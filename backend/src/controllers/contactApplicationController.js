import ContactApplication from "../models/ContactApplication.js";
import nodemailer from "nodemailer";

// @desc    Create new Contact Application submission
// @route   POST /api/contact-applications
// @access  Public
export const createContactApplication = async (req, res, next) => {
  try {
    const { name, company, phone, email, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      res.status(400);
      throw new Error("Please provide all required fields: name, phone, subject, and message");
    }

    const application = await ContactApplication.create({
      name,
      company,
      phone,
      email,
      subject,
      message
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Contact Applications (with optional status / search filter)
// @route   GET /api/contact-applications
// @access  Private (Admin)
export const getContactApplications = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { name: regex },
        { company: regex },
        { phone: regex },
        { email: regex },
        { subject: regex },
        { message: regex }
      ];
    }

    const applications = await ContactApplication.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Contact Application status
// @route   PUT /api/contact-applications/:id
// @access  Private (Admin)
export const updateContactApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400);
      throw new Error("Status field is required");
    }

    const application = await ContactApplication.findById(id);

    if (!application) {
      res.status(404);
      throw new Error("Contact Application not found");
    }

    application.status = status;
    const updated = await application.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a Contact Application
// @route   DELETE /api/contact-applications/:id
// @access  Private (Admin)
export const deleteContactApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await ContactApplication.findById(id);

    if (!application) {
      res.status(404);
      throw new Error("Contact Application not found");
    }

    await application.deleteOne();
    res.json({ message: "Contact Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Send email to contact applicant
// @route   POST /api/contact-applications/:id/send-email
// @access  Private (Admin)
export const sendContactEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await ContactApplication.findById(id);
    if (!application) {
      res.status(404);
      throw new Error("Contact Application not found");
    }

    const { subject, message } = req.body;
    if (!subject || !message) {
      res.status(400);
      throw new Error("Subject and Message body are required");
    }

    if (!application.email) {
      res.status(400);
      throw new Error("This submission does not have an email address");
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = process.env.SMTP_PORT || 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      res.status(400);
      throw new Error("SMTP credentials are not configured in backend/.env. Please configure SMTP_USER and SMTP_PASS.");
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Supremo Contact Inquiry" <${smtpUser}>`,
      to: application.email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    if (application.status !== "Closed") {
      application.status = "Replied";
    }
    const updated = await application.save();

    res.json({
      success: true,
      message: "Email sent successfully",
      application: updated
    });
  } catch (error) {
    next(error);
  }
};
