import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { errorHandler } from "./middleware/errorHandler.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import homepageRoutes from "./routes/homepageRoutes.js";
import journeyRoutes from "./routes/journeyRoutes.js";
import whyUsRoutes from "./routes/whyUsRoutes.js";
import reachRoutes from "./routes/reachRoutes.js";
import dealerNetworkRoutes from "./routes/dealerNetworkRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import dealershipRoutes from "./routes/dealershipRoutes.js";
import careersRoutes from "./routes/careersRoutes.js";
import careerApplicationRoutes from "./routes/careerApplicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import contactApplicationRoutes from "./routes/contactApplicationRoutes.js";
import termsRoutes from "./routes/termsRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";
import warrantyRoutes from "./routes/warrantyRoutes.js";

const app = express();

// Trust the first proxy hop so client IPs (used for rate limiting and visit
// logging) are read correctly behind a reverse proxy / hosting platform.
app.set("trust proxy", 1);

// Security headers. crossOriginResourcePolicy is relaxed to "cross-origin" so
// the separate-origin frontend can still load /uploads assets; CSP is disabled
// here because this server returns JSON/static assets, not the HTML app.
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
}));

// Global Middlewares
const allowedOrigins = [
  "https://www.supremo.in",
  "https://supremo.in",
  "http://localhost:3000",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// API Routes Mounting
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/homepage-sections", homepageRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/why-us", whyUsRoutes);
app.use("/api/reach", reachRoutes);
app.use("/api/dealer-network", dealerNetworkRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/dealership", dealershipRoutes);
app.use("/api/careers", careersRoutes);
app.use("/api/career-applications", careerApplicationRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/contact-applications", contactApplicationRoutes);
app.use("/api/terms", termsRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/warranty", warrantyRoutes);

// 404 handler for unmatched routes (returns JSON instead of Express default HTML)
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Global Error Handler
app.use(errorHandler);

export default app;

