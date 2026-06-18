import React from "react";
import { CATEGORY_COLORS } from "../utils/constants";

const CategoryBadge = ({ category }) => {
  const color = CATEGORY_COLORS[category] || "#a8a29e";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}1a`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {category}
    </span>
  );
};

export default CategoryBadge;
