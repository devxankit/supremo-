import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import cloudinary from "../utils/cloudinary.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

const router = express.Router();

// @desc    Upload single file to Cloudinary / Local storage for PDFs
// @route   POST /api/media/upload
// @access  Private (Admin)
router.post("/upload", protectAdmin, upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    // Handle PDF uploads locally to prevent Cloudinary security/ACL access issues
    if (req.file.mimetype === "application/pdf") {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      return res.json({
        url: `${baseUrl}/uploads/${fileName}`,
        public_id: fileName,
        bytes: req.file.size,
        format: "pdf"
      });
    }

    // Setup Cloudinary upload stream for other asset types (images / videos)
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "supremo",
        resource_type: "auto" // Auto detect images / videos
      },
      (error, result) => {
        if (error) {
          return next(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        res.json({
          url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          format: result.format
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
});

// @desc    Upload single image file to Cloudinary for public submissions (e.g. visiting cards)
// @route   POST /api/media/upload-public
// @access  Public
router.post("/upload-public", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "supremo/public",
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          return next(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        res.json({
          url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          format: result.format
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
});

// @desc    Upload single resume file (image or PDF) for public submissions
// @route   POST /api/media/upload-public-resume
// @access  Public
router.post("/upload-public-resume", upload.single("file"), (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    // Handle PDF uploads locally
    if (req.file.mimetype === "application/pdf") {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      return res.json({
        url: `${baseUrl}/uploads/${fileName}`,
        public_id: fileName,
        bytes: req.file.size,
        format: "pdf"
      });
    }

    // Handle image uploads to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "supremo/public/resumes",
        resource_type: "image"
      },
      (error, result) => {
        if (error) {
          return next(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        res.json({
          url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          format: result.format
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
});


// Helper to fetch file from URL using http/https with redirect following
const downloadFile = (fileUrl, redirectCount = 0) => {
  if (redirectCount > 5) {
    return Promise.reject(new Error("Too many redirects"));
  }
  return new Promise((resolve, reject) => {
    const client = fileUrl.startsWith("https") ? https : http;
    client.get(fileUrl, (response) => {
      // Check for redirect status codes (301, 302, 303, 307, 308)
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location) {
        let redirectUrl = response.headers.location;
        response.resume(); // Consume/discard response body to free up connection/socket
        try {
          // Resolve redirect URL relative to the original URL if it's relative
          redirectUrl = new URL(redirectUrl, fileUrl).href;
        } catch (e) {
          reject(new Error(`Invalid redirect URL: ${redirectUrl}`));
          return;
        }
        downloadFile(redirectUrl, redirectCount + 1)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch file: ${response.statusCode}`));
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        resolve({
          buffer: Buffer.concat(chunks),
          contentType: response.headers["content-type"]
        });
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
};


// @desc    Download file directly as attachment
// @route   GET /api/media/download
// @access  Public
router.get("/download", async (req, res, next) => {
  try {
    let { url } = req.query;
    if (!url) {
      res.status(400);
      throw new Error("URL is required");
    }

    if (url.includes("localhost:5001")) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      url = url.replace(/https?:\/\/localhost:5001/, baseUrl);
    }

    const { buffer, contentType } = await downloadFile(url);
    const filename = url.split("/").pop() || "brochure";
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }
    res.send(buffer);
  } catch (error) {
    next(error);
  }
});

export default router;
