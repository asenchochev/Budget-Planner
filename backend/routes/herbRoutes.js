import express from "express";
import { getHerbs } from "../controllers/herbController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getHerbs);

export default router;
