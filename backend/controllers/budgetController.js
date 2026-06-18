import asyncHandler from "express-async-handler";
import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

const currentMonth = () => new Date().toISOString().slice(0, 7); // "YYYY-MM"

// @desc    Задава/обновява бюджет за конкретен месец (upsert)
// @route   POST /api/budget
// @access  Private
export const setBudget = asyncHandler(async (req, res) => {
  const { amount, month } = req.body;
  const targetMonth = month || currentMonth();

  if (amount === undefined || amount < 0) {
    res.status(400);
    throw new Error("Моля, въведете валидна сума за бюджета");
  }

  const budget = await Budget.findOneAndUpdate(
    { user: req.user._id, month: targetMonth },
    { amount },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({ success: true, data: budget });
});

// @desc    Връща бюджета + изхарчено + оставащо за даден месец (по подразбиране текущ)
// @route   GET /api/budget?month=YYYY-MM
// @access  Private
export const getBudget = asyncHandler(async (req, res) => {
  const targetMonth = req.query.month || currentMonth();

  const budget = await Budget.findOne({ user: req.user._id, month: targetMonth });

  const spentResult = await Expense.aggregate([
    { $match: { user: req.user._id, month: targetMonth } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const spent = spentResult[0]?.total || 0;
  const amount = budget?.amount || 0;

  res.json({
    success: true,
    data: {
      month: targetMonth,
      budget: amount,
      spent,
      remaining: Math.round((amount - spent) * 100) / 100,
      percentUsed: amount > 0 ? Math.min(100, Math.round((spent / amount) * 100)) : 0,
      exists: !!budget,
    },
  });
});

// @desc    История на бюджетите (последните N месеца)
// @route   GET /api/budget/history
// @access  Private
export const getBudgetHistory = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id }).sort({ month: -1 }).limit(12);
  res.json({ success: true, data: budgets });
});
