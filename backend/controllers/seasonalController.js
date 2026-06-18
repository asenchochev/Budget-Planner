import asyncHandler from "express-async-handler";
import seasonalProducts, { SEASONS, SEASON_LABELS_BG, getCurrentSeason } from "../data/seasonalProducts.js";

// @desc    Сезонни препоръчани продукти - по подразбиране текущия сезон
// @route   GET /api/seasonal?season=spring|summer|autumn|winter
// @access  Private
export const getSeasonalProducts = asyncHandler(async (req, res) => {
  const { season } = req.query;
  const targetSeason = SEASONS.includes(season) ? season : getCurrentSeason();

  res.json({
    success: true,
    data: {
      season: targetSeason,
      label: SEASON_LABELS_BG[targetSeason],
      products: seasonalProducts[targetSeason],
    },
  });
});
