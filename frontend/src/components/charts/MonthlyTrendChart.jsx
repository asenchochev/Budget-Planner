import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency, formatMonthLabel } from "../../utils/format";

const MonthlyTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-sm text-ink/40 text-center py-12">Няма достатъчно данни за тренд.</p>;
  }

  const chartData = data.map((d) => ({ ...d, label: formatMonthLabel(d.month).split(" ")[0] }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1ebe3" />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#1f2a24aa" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#1f2a24aa" }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Line type="monotone" dataKey="total" stroke="#4c7a5e" strokeWidth={2.5} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyTrendChart;
