import asyncHandler from "express-async-handler";
import herbs, { HERB_DISCLAIMER } from "../data/herbs.js";

// @desc    Каталог с билки и приложение
// @route   GET /api/herbs
// @access  Private
export const getHerbs = asyncHandler(async (req, res) => {
  res.json({ success: true, disclaimer: HERB_DISCLAIMER, count: herbs.length, data: herbs });
});
