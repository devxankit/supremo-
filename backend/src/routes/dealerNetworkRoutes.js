import express from "express";
import { getDealerNetworkContent, updateDealerNetworkContent } from "../controllers/dealerNetworkController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDealerNetworkContent);
router.put("/", protectAdmin, updateDealerNetworkContent);

export default router;
