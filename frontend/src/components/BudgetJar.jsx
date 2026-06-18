import React from "react";
import { formatCurrency } from "../utils/format";

/**
 * Сигнатурен елемент на дизайна - "буркан", който се изпразва с харченето.
 * percentUsed: 0-100, колко % от бюджета е изхарчено.
 * Нивото на течността = (100 - percentUsed)% от вътрешната височина на буркана.
 */
const BudgetJar = ({ percentUsed = 0, remaining = 0, budget = 0 }) => {
  const clampedUsed = Math.min(100, Math.max(0, percentUsed));
  const fillRatio = (100 - clampedUsed) / 100;

  // Вътрешна зона на буркана (вътре в очертанието) - координати в 0..160 viewBox
  const innerTop = 28;
  const innerBottom = 152;
  const innerHeight = innerBottom - innerTop;
  const fillHeight = innerHeight * fillRatio;
  const fillY = innerBottom - fillHeight;

  const isOverBudget = remaining < 0;
  const isWarning = !isOverBudget && clampedUsed >= 80;
  const fillColor = isOverBudget ? "#c2733b" : isWarning ? "#d4a373" : "#4c7a5e";

  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 120 170" className="w-20 h-28 shrink-0" aria-hidden="true">
        <defs>
          <clipPath id="jarClip">
            <path d="M30 28 h60 a6 6 0 0 1 6 6 v110 a8 8 0 0 1 -8 8 H32 a8 8 0 0 1 -8 -8 V34 a6 6 0 0 1 6 -6 z" />
          </clipPath>
        </defs>

        {/* Капак на буркана */}
        <rect x="38" y="10" width="44" height="14" rx="3" fill="#9bbda3" />
        <rect x="34" y="20" width="52" height="10" rx="4" fill="#6f9c7b" />

        {/* Очертание на буркана */}
        <path
          d="M30 28 h60 a6 6 0 0 1 6 6 v110 a8 8 0 0 1 -8 8 H32 a8 8 0 0 1 -8 -8 V34 a6 6 0 0 1 6 -6 z"
          fill="#f3f7f4"
          stroke="#c3d7c8"
          strokeWidth="2"
        />

        {/* Запълване - "оставащ бюджет" */}
        <g clipPath="url(#jarClip)">
          <rect x="22" y={fillY} width="76" height={fillHeight} fill={fillColor} opacity="0.85" />
          <rect x="22" y={fillY} width="76" height="4" fill={fillColor} opacity="0.5" />
        </g>
      </svg>

      <div>
        <p className="text-xs text-ink/50 mb-1">Оставащ бюджет</p>
        <p className={`font-mono font-bold text-2xl ${remaining < 0 ? "text-clay-600" : "text-ink"}`}>
          {formatCurrency(remaining)}
        </p>
        <p className="text-xs text-ink/40 mt-1">от общо {formatCurrency(budget)}</p>
      </div>
    </div>
  );
};

export default BudgetJar;
