import multer from "multer";

const storage = multer.memoryStorage();

const mediaFileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images, videos and PDF documents are allowed"), false);
  }
};

// Admin uploader — allows large files/videos.
export const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: mediaFileFilter
});

// Public uploader — much smaller cap to limit abuse on unauthenticated routes
// (visiting cards / resumes don't need 100MB).
export const uploadPublic = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: mediaFileFilter
});
