import React from "react";

const StatCard = ({ icon: Icon, label, value, tone = "sage" }) => {
  const toneClasses = {
    sage: "bg-sage-50 text-sage-600",
    clay: "bg-clay-50 text-clay-600",
  };

  return (
    <div className="card flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${toneClasses[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-ink/50 mb-0.5">{label}</p>
        <p className="font-mono font-semibold text-lg text-ink">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
