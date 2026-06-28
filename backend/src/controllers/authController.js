import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_jwt_secret", {
    expiresIn: "8h"
  });
};

// Seed admin account automatically
export const seedAdmin = async () => {
  try {
    // Clean up old default admin if it exists
    await Admin.deleteOne({ email: "admin@supremo.com" });

    const adminEmail = process.env.ADMIN_SEED_EMAIL;
    const adminExists = await Admin.findOne({ email: adminEmail });
    if (!adminExists) {
      await Admin.create({
        name: process.env.ADMIN_SEED_NAME,
        phone: process.env.ADMIN_SEED_PHONE,
        email: adminEmail,
        password: process.env.ADMIN_SEED_PASSWORD, // Pre-save hook will hash this
        role: "admin"
      });
      console.log(`Admin account seeded successfully: ${adminEmail}`);
    }
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
  }
};

// @desc    Authenticate admin user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        phone: admin.phone,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin user profile
// @route   GET /api/auth/me
// @access  Private (Admin)
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id).select("-password");
    if (admin) {
      res.json(admin);
    } else {
      res.status(404);
      throw new Error("Admin not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin user profile
// @route   PUT /api/auth/profile
// @access  Private (Admin)
export const updateAdminProfile = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const admin = await Admin.findById(req.user._id);

    if (!admin) {
      res.status(404);
      throw new Error("Admin user not found");
    }

    if (email && email.toLowerCase() !== admin.email) {
      const emailExists = await Admin.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        res.status(400);
        throw new Error("Email address is already in use by another admin.");
      }
      admin.email = email.toLowerCase();
    }

    if (name) admin.name = name;
    if (phone) admin.phone = phone;

    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      phone: updatedAdmin.phone,
      email: updatedAdmin.email,
      role: updatedAdmin.role
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admin password
// @route   PUT /api/auth/password
// @access  Private (Admin)
export const updateAdminPassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error("Please provide current and new passwords.");
    }

    const admin = await Admin.findById(req.user._id);
    if (!admin) {
      res.status(404);
      throw new Error("Admin user not found");
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401);
      throw new Error("Incorrect current password.");
    }

    if (newPassword.length < 6) {
      res.status(400);
      throw new Error("New password must be at least 6 characters.");
    }

    admin.password = newPassword; // Pre-save hook hashes it automatically
    await admin.save();

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};


