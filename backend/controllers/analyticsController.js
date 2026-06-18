import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

const currentMonth = () => new Date().toISOString().slice(0, 7);

// @desc    Обобщени статистики за dashboard - бюджет, разход по категория, тренд
// @route   GET /api/analytics/dashboard?month=YYYY-MM
// @access  Private
export const getDashboardStats = asyncHandler(async (req, res) => {
  const month = req.query.month || currentMonth();
  const userId = req.user._id;

  const budget = await Budget.findOne({ user: userId, month });

  // Разход по категория за избрания месец - захранва pie chart-а
  const byCategory = await Expense.aggregate([
    { $match: { user: userId, month } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);

  // Тренд за последните 6 месеца (включително текущия) - захранва line chart-а
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  const sixMonthsAgoStr = sixMonthsAgo.toISOString().slice(0, 7);

  const monthlyTrend = await Expense.aggregate([
    { $match: { user: userId, month: { $gte: sixMonthsAgoStr } } },
    { $group: { _id: "$month", total: { $sum: "$amount" } } },
    { $sort: { _id: 1 } },
  ]);

  const totalSpent = byCategory.reduce((sum, c) => sum + c.total, 0);
  const budgetAmount = budget?.amount || 0;

  res.json({
    success: true,
    data: {
      month,
      budget: budgetAmount,
      spent: totalSpent,
      remaining: Math.round((budgetAmount - totalSpent) * 100) / 100,
      percentUsed: budgetAmount > 0 ? Math.min(100, Math.round((totalSpent / budgetAmount) * 100)) : 0,
      byCategory: byCategory.map((c) => ({ category: c._id, total: Math.round(c.total * 100) / 100 })),
      monthlyTrend: monthlyTrend.map((m) => ({ month: m._id, total: Math.round(m.total * 100) / 100 })),
    },
  });
});
