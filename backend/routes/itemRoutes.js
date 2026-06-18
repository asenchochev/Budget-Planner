import express from "express";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  togglePurchased,
} from "../controllers/itemController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.route("/").get(getItems).post(createItem);
router.route("/:id").put(updateItem).delete(deleteItem);
router.patch("/:id/purchase", togglePurchased);

export default router;
