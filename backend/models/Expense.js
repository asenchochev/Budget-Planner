import mongoose from "mongoose";
import { CATEGORIES } from "./Item.js";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Връзка към продукта, ако разходът идва от списъка за пазаруване
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      default: null,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: "Друго",
    },
    amount: {
      type: Number,
      required: [true, "Сумата е задължителна"],
      min: [0, "Сумата не може да е отрицателна"],
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

expenseSchema.index({ user: 1, month: 1 });
expenseSchema.index({ user: 1, category: 1 });

export default mongoose.model("Expense", expenseSchema);
