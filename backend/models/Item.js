import mongoose from "mongoose";

export const CATEGORIES = [
  "Плодове и зеленчуци",
  "Месо и риба",
  "Млечни продукти",
  "Хляб и тестени",
  "Бакалия",
  "Напитки",
  "Битова химия",
  "Хигиена",
  "Билки и подправки",
  "Друго",
];

const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Името на продукта е задължително"],
      trim: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Цената е задължителна"],
      min: [0, "Цената не може да е отрицателна"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Количеството трябва да е поне 1"],
      default: 1,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      default: "Друго",
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    // Месец, за който се води продуктът - "YYYY-MM"
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/,
    },
  },
  { timestamps: true }
);

// Виртуално поле за обща сума на реда (цена * количество)
itemSchema.virtual("totalPrice").get(function () {
  return Math.round(this.price * this.quantity * 100) / 100;
});
itemSchema.set("toJSON", { virtuals: true });

itemSchema.index({ user: 1, month: 1 });

export default mongoose.model("Item", itemSchema);
