import express from "express";
import { getSeasonalProducts } from "../controllers/seasonalController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getSeasonalProducts);

export default router;
