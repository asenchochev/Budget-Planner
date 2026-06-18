import React from "react";
import { Pencil, Trash2, Check } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { formatCurrency } from "../utils/format";

const ItemRow = ({ item, onTogglePurchased, onEdit, onDelete }) => {
  return (
    <div
      className={`flex items-center gap-3 p-3.5 rounded-lg border transition-colors ${
        item.purchased ? "bg-sage-50/50 border-sage-100" : "bg-white border-sage-100"
      }`}
    >
      <button
        onClick={() => onTogglePurchased(item._id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          item.purchased ? "bg-sage-500 border-sage-500 text-white" : "border-sage-300"
        }`}
        aria-label="Маркирай като купено"
      >
        {item.purchased && <Check size={14} />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${item.purchased ? "line-through text-ink/40" : "text-ink"}`}>
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <CategoryBadge category={item.category} />
          <span className="text-xs text-ink/40">x{item.quantity}</span>
        </div>
      </div>

      <p className="font-mono text-sm font-semibold shrink-0">{formatCurrency(item.price * item.quantity)}</p>

      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onEdit(item)} className="p-1.5 text-ink/40 hover:text-sage-600 transition-colors">
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(item._id)} className="p-1.5 text-ink/40 hover:text-clay-600 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
};

export default ItemRow;
