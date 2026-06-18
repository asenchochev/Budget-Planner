import express from "express";
import { setBudget, getBudget, getBudgetHistory } from "../controllers/budgetController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getBudget).post(setBudget);
router.get("/history", getBudgetHistory);

export default router;
