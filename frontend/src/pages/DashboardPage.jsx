import React, { useEffect, useState } from "react";
import { Wallet, TrendingDown, ShoppingBag, AlertTriangle } from "lucide-react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import BudgetJar from "../components/BudgetJar";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import { getDashboardStats } from "../services/analyticsService";
import { getItems } from "../services/itemService";
import { formatCurrency, currentMonth, formatMonthLabel } from "../utils/format";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsData, pendingItems] = await Promise.all([
          getDashboardStats(currentMonth()),
          getItems({ purchased: false }),
        ]);
        setStats(statsData);
        setPendingCount(pendingItems.length);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Layout><Loader label="Зареждане на таблото..." /></Layout>;

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="font-display font-semibold text-2xl">Здравей, {user?.name?.split(" ")[0]} 👋</h1>
        <p className="text-ink/50 text-sm mt-1">{formatMonthLabel(currentMonth())}</p>
      </div>

      {stats?.budget === 0 && (
        <div className="card mb-6 flex items-center gap-3 bg-clay-50 border-clay-100">
          <AlertTriangle size={18} className="text-clay-600 shrink-0" />
          <p className="text-sm text-clay-700">
            Все още нямате зададен бюджет за този месец. Отидете в раздел "Бюджет", за да го зададете.
          </p>
        </div>
      )}

      <div className="card mb-6">
        <BudgetJar percentUsed={stats?.percentUsed} remaining={stats?.remaining} budget={stats?.budget} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Wallet} label="Месечен бюджет" value={formatCurrency(stats?.budget)} />
        <StatCard icon={TrendingDown} label="Изхарчено" value={formatCurrency(stats?.spent)} tone="clay" />
        <StatCard icon={ShoppingBag} label="Чакащи продукти" value={pendingCount} />
      </div>

      <div className="card">
        <h2 className="font-display font-semibold mb-4">Разходи по категория</h2>
        <ExpensePieChart data={stats?.byCategory} />
      </div>
    </Layout>
  );
};

export default DashboardPage;
