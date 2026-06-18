import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import MonthlyTrendChart from "../components/charts/MonthlyTrendChart";
import CategoryBadge from "../components/CategoryBadge";
import { getDashboardStats } from "../services/analyticsService";
import { currentMonth, formatCurrency } from "../utils/format";

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats(currentMonth()).then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Layout><Loader /></Layout>;

  const maxCategoryTotal = Math.max(...(stats?.byCategory?.map((c) => c.total) || [1]), 1);

  return (
    <Layout>
      <h1 className="font-display font-semibold text-2xl mb-1">Анализи</h1>
      <p className="text-ink/50 text-sm mb-6">Преглед на разходите по категория и тенденция във времето.</p>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div className="card">
          <h2 className="font-display font-semibold mb-4">Разпределение по категория</h2>
          <ExpensePieChart data={stats?.byCategory} />
        </div>

        <div className="card">
          <h2 className="font-display font-semibold mb-4">Тренд - последните месеци</h2>
          <MonthlyTrendChart data={stats?.monthlyTrend} />
        </div>
      </div>

      <div className="card">
        <h2 className="font-display font-semibold mb-4">Детайлно по категория</h2>
        {stats?.byCategory?.length === 0 ? (
          <p className="text-sm text-ink/40 text-center py-6">Няма данни за този месец.</p>
        ) : (
          <div className="space-y-3">
            {stats?.byCategory?.map((c) => (
              <div key={c.category} className="flex items-center gap-3">
                <div className="w-36 shrink-0">
                  <CategoryBadge category={c.category} />
                </div>
                <div className="flex-1 h-2 bg-sage-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sage-500 rounded-full"
                    style={{ width: `${(c.total / maxCategoryTotal) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-sm font-medium w-20 text-right shrink-0">
                  {formatCurrency(c.total)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
