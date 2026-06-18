import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import CategoryBadge from "../components/CategoryBadge";
import { getSeasonalProducts } from "../services/analyticsService";
import { SEASON_LABELS } from "../utils/constants";

const SEASON_ICONS = { spring: "🌱", summer: "☀️", autumn: "🍂", winter: "❄️" };

const SeasonalPage = () => {
  const [data, setData] = useState(null);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async (s) => {
    setLoading(true);
    const result = await getSeasonalProducts(s);
    setData(result);
    setSeason(result.season);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <h1 className="font-display font-semibold text-2xl mb-1">Сезонни продукти</h1>
      <p className="text-ink/50 text-sm mb-6">Здравословни и бюджетни продукти, подходящи за сезона.</p>

      <div className="flex gap-2 mb-6">
        {Object.keys(SEASON_LABELS).map((key) => (
          <button
            key={key}
            onClick={() => load(key)}
            className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              season === key ? "bg-sage-500 text-white" : "bg-white border border-sage-100 text-ink/60"
            }`}
          >
            <span>{SEASON_ICONS[key]}</span> {SEASON_LABELS[key]}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.products?.map((p, idx) => (
            <div key={idx} className="card">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-display font-semibold">{p.name}</h3>
                <span className="text-lg">{SEASON_ICONS[data.season]}</span>
              </div>
              <CategoryBadge category={p.category} />
              <p className="text-sm text-ink/60 mt-3">{p.note}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default SeasonalPage;
