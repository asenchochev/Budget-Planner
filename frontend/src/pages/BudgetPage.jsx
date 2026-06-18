import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import BudgetJar from "../components/BudgetJar";
import { getBudget, setBudget as setBudgetApi, getBudgetHistory } from "../services/budgetService";
import { currentMonth, formatCurrency, formatMonthLabel } from "../utils/format";

const BudgetPage = () => {
  const [budgetData, setBudgetData] = useState(null);
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const [budget, hist] = await Promise.all([getBudget(currentMonth()), getBudgetHistory()]);
    setBudgetData(budget);
    setHistory(hist);
    setAmount(budget.budget || "");
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setBudgetApi(parseFloat(amount), currentMonth());
      toast.success("Бюджетът е запазен");
      await load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Грешка при запазване");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <h1 className="font-display font-semibold text-2xl mb-1">Бюджет</h1>
      <p className="text-ink/50 text-sm mb-6">Задайте месечния си бюджет и следете как се изпълнява.</p>

      <div className="grid md:grid-cols-2 gap-5 mb-6">
        <div className="card">
          <h2 className="font-display font-semibold mb-4">{formatMonthLabel(currentMonth())}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Сума на бюджета (лв.)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="input-field"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? "Запазване..." : "Запази бюджет"}
            </button>
          </form>
        </div>

        <div className="card flex flex-col justify-center">
          <BudgetJar
            percentUsed={budgetData?.percentUsed}
            remaining={budgetData?.remaining}
            budget={budgetData?.budget}
          />
        </div>
      </div>

      <div className="card">
        <h2 className="font-display font-semibold mb-4">История на бюджетите</h2>
        {history.length === 0 ? (
          <p className="text-sm text-ink/40 py-4 text-center">Все още няма история.</p>
        ) : (
          <div className="space-y-2">
            {history.map((h) => (
              <div key={h._id} className="flex items-center justify-between py-2 border-b border-sage-50 last:border-0">
                <span className="text-sm text-ink/70">{formatMonthLabel(h.month)}</span>
                <span className="font-mono text-sm font-medium">{formatCurrency(h.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BudgetPage;
