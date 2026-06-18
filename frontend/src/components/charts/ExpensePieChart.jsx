import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CATEGORY_COLORS } from "../../utils/constants";
import { formatCurrency } from "../../utils/format";

const ExpensePieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-ink/40 text-center py-12">Все още няма разходи за този месец.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={CATEGORY_COLORS[entry.category] || "#a8a29e"} stroke="none" />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
