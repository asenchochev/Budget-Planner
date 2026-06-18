export const formatCurrency = (value) =>
  new Intl.NumberFormat("bg-BG", { style: "currency", currency: "EUR" }).format(value || 0);

export const formatMonthLabel = (monthStr) => {
  if (!monthStr) return "";
  const [year, month] = monthStr.split("-");
  const labels = [
    "Януари", "Февруари", "Март", "Април", "Май", "Юни",
    "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември",
  ];
  return `${labels[parseInt(month, 10) - 1]} ${year}`;
};

export const currentMonth = () => new Date().toISOString().slice(0, 7);
