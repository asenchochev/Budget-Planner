import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";

const currentMonth = () => new Date().toISOString().slice(0, 7);

// @desc    Списък разходи за месец (по подразбиране текущ)
// @route   GET /api/expenses?month=YYYY-MM
// @access  Private
export const getExpenses = asyncHandler(async (req, res) => {
  const month = req.query.month || currentMonth();
  const expenses = await Expense.find({ user: req.user._id, month }).sort({ date: -1 });
  res.json({ success: true, count: expenses.length, data: expenses });
});

// @desc    Ръчно добавяне на разход (извън списъка за пазаруване)
// @route   POST /api/expenses
// @access  Private
export const createExpense = asyncHandler(async (req, res) => {
  const { description, category, amount, month, date } = req.body;

  if (!amount || amount < 0) {
    res.status(400);
    throw new Error("Моля, въведете валидна сума");
  }

  const expense = await Expense.create({
    user: req.user._id,
    description,
    category,
    amount,
    month: month || currentMonth(),
    date: date || Date.now(),
  });

  res.status(201).json({ success: true, data: expense });
});

// @desc    Изтрива разход
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!expense) {
    res.status(404);
    throw new Error("Разходът не е намерен");
  }

  res.json({ success: true, data: { id: req.params.id } });
});
