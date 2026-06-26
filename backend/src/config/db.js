import mongoose from "mongoose";
import { seedAdmin } from "../controllers/authController.js";
import { seedSettings } from "../controllers/settingsController.js";
import { seedPageVisits } from "../controllers/inquiryController.js";
import { seedHeroContent } from "../controllers/heroController.js";
import { seedHomepageSections } from "../controllers/homepageController.js";
import { seedJourneyContent } from "../controllers/journeyController.js";
import { seedWhyUsContent } from "../controllers/whyUsController.js";
import { seedReachContent } from "../controllers/reachController.js";
import { seedDealerNetworkContent } from "../controllers/dealerNetworkController.js";
import { seedAboutContent } from "../controllers/aboutController.js";
import { seedGalleryContent } from "../controllers/galleryController.js";
import { seedBlogs } from "../controllers/blogController.js";
import { seedDealershipContent } from "../controllers/dealershipController.js";
import { seedCareersContent } from "../controllers/careersController.js";
import { seedContactContent } from "../controllers/contactController.js";
import { seedTermsContent } from "../controllers/termsController.js";
import { seedPrivacyContent } from "../controllers/privacyController.js";
import { seedWarrantyContent } from "../controllers/warrantyController.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default admin account
    await seedAdmin();

    // Seed default settings
    await seedSettings();

    // Seed default hero content
    await seedHeroContent();

    // Seed default homepage sections
    await seedHomepageSections();

    // Seed default journey content
    await seedJourneyContent();

    // Seed default why-us content
    await seedWhyUsContent();

    // Seed default reach content
    await seedReachContent();

    // Seed default dealer network content
    await seedDealerNetworkContent();

    // Seed default about content
    await seedAboutContent();

    // Seed default dealership content
    await seedDealershipContent();

    // Seed default careers content
    await seedCareersContent();

    // Seed default contact content
    await seedContactContent();

    // Seed default terms content
    await seedTermsContent();

    // Seed default privacy content
    await seedPrivacyContent();

    // Seed default warranty content
    await seedWarrantyContent();

    // Seed default blog posts
    await seedBlogs();

    // Seed default gallery content
    await seedGalleryContent();

    // Seed default simulated page visits
    await seedPageVisits();


  } catch (error) {

    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


