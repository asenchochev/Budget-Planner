import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Формат "YYYY-MM", напр. "2026-06" - позволява лесна история по месеци
    month: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}$/, "Невалиден формат на месец (очаква се YYYY-MM)"],
    },
    amount: {
      type: Number,
      required: [true, "Сумата на бюджета е задължителна"],
      min: [0, "Бюджетът не може да е отрицателен"],
    },
  },
  { timestamps: true }
);

// Един потребител може да има само по един бюджет на месец
budgetSchema.index({ user: 1, month: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);
