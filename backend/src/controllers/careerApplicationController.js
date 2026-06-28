import CareerApplication from "../models/CareerApplication.js";
import nodemailer from "nodemailer";
import { escapeRegex } from "../utils/escapeRegex.js";

// @desc    Create new Career Application submission
// @route   POST /api/career-applications
// @access  Public
export const createCareerApplication = async (req, res, next) => {
  try {
    const { name, email, phone, areaOfInterest, resume, message } = req.body;

    if (!name || !email || !phone || !areaOfInterest || !resume) {
      res.status(400);
      throw new Error("Please provide all required fields: name, email, phone, area of interest, and resume");
    }

    const application = await CareerApplication.create({
      name,
      email,
      phone,
      areaOfInterest,
      resume,
      message
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Career Applications (with optional status / search filter)
// @route   GET /api/career-applications
// @access  Private (Admin)
export const getCareerApplications = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      query.$or = [
        { name: regex },
        { email: regex },
        { phone: regex },
        { areaOfInterest: regex }
      ];
    }

    const applications = await CareerApplication.find(query).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

// @desc    Update Career Application status
// @route   PUT /api/career-applications/:id
// @access  Private (Admin)
export const updateCareerApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400);
      throw new Error("Status field is required");
    }

    const application = await CareerApplication.findById(id);

    if (!application) {
      res.status(404);
      throw new Error("Career Application not found");
    }

    application.status = status;
    const updated = await application.save();

    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a Career Application
// @route   DELETE /api/career-applications/:id
// @access  Private (Admin)
export const deleteCareerApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await CareerApplication.findById(id);

    if (!application) {
      res.status(404);
      throw new Error("Career Application not found");
    }

    await application.deleteOne();
    res.json({ message: "Career Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Send email to career applicant
// @route   POST /api/career-applications/:id/send-email
// @access  Private (Admin)
export const sendCareerEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const application = await CareerApplication.findById(id);
    if (!application) {
      res.status(404);
      throw new Error("Career Application not found");
    }

    const { subject, message } = req.body;
    if (!subject || !message) {
      res.status(400);
      throw new Error("Subject and Message body are required");
    }

    if (!application.email) {
      res.status(400);
      throw new Error("This application does not have an email address");
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
      from: `"Supremo Careers" <${smtpUser}>`,
      to: application.email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    if (application.status !== "Active" && application.status !== "Rejected") {
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
