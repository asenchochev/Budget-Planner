import React from "react";

const Loader = ({ label = "Зареждане..." }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3 text-ink/50">
    <div className="w-8 h-8 border-2 border-sage-200 border-t-sage-500 rounded-full animate-spin" />
    <p className="text-sm">{label}</p>
  </div>
);

export default Loader;
