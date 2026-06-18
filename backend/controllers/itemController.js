import asyncHandler from "express-async-handler";
import Item from "../models/Item.js";
import Expense from "../models/Expense.js";

const currentMonth = () => new Date().toISOString().slice(0, 7);

// @desc    Списък продукти (с филтри по месец/категория/purchased)
// @route   GET /api/items?month=YYYY-MM&category=&purchased=
// @access  Private
export const getItems = asyncHandler(async (req, res) => {
  const { month, category, purchased } = req.query;
  const filter = { user: req.user._id, month: month || currentMonth() };

  if (category) filter.category = category;
  if (purchased !== undefined) filter.purchased = purchased === "true";

  const items = await Item.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: items.length, data: items });
});

// @desc    Създава нов продукт в списъка за пазаруване
// @route   POST /api/items
// @access  Private
export const createItem = asyncHandler(async (req, res) => {
  const { name, price, quantity, category, month } = req.body;

  const item = await Item.create({
    user: req.user._id,
    name,
    price,
    quantity: quantity || 1,
    category,
    month: month || currentMonth(),
  });

  res.status(201).json({ success: true, data: item });
});

// @desc    Обновява продукт (име/цена/количество/категория)
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });

  if (!item) {
    res.status(404);
    throw new Error("Продуктът не е намерен");
  }

  Object.assign(item, req.body);
  await item.save();

  res.json({ success: true, data: item });
});

// @desc    Изтрива продукт от списъка
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!item) {
    res.status(404);
    throw new Error("Продуктът не е намерен");
  }

  res.json({ success: true, data: { id: req.params.id } });
});

// @desc    Маркира продукт като купен и автоматично създава Expense запис
// @route   PATCH /api/items/:id/purchase
// @access  Private
export const togglePurchased = asyncHandler(async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, user: req.user._id });

  if (!item) {
    res.status(404);
    throw new Error("Продуктът не е намерен");
  }

  item.purchased = !item.purchased;
  await item.save();

  if (item.purchased) {
    // Създаваме разход, само ако още няма свързан такъв за този продукт
    const existingExpense = await Expense.findOne({ item: item._id });
    if (!existingExpense) {
      await Expense.create({
        user: req.user._id,
        item: item._id,
        description: item.name,
        category: item.category,
        amount: item.totalPrice,
        month: item.month,
      });
    }
  } else {
    // Ако се размаркира, премахваме автоматично генерирания разход
    await Expense.findOneAndDelete({ item: item._id });
  }

  res.json({ success: true, data: item });
});
