import React, { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { getHerbs } from "../services/analyticsService";
import { SEASON_LABELS } from "../utils/constants";

const HerbsPage = () => {
  const [herbs, setHerbs] = useState([]);
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHerbs().then((res) => {
      setHerbs(res.data);
      setDisclaimer(res.disclaimer);
      setLoading(false);
    });
  }, []);

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <h1 className="font-display font-semibold text-2xl mb-1">Билки и приложение</h1>
      <p className="text-ink/50 text-sm mb-4">Каталог с билки, сезон на бране и общоприето приложение.</p>

      <div className="card mb-6 bg-sage-50/60 border-sage-100">
        <p className="text-xs text-ink/60 leading-relaxed">{disclaimer}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {herbs.map((herb) => (
          <div key={herb.name} className="card">
            <div className="flex items-center gap-2 mb-1">
              <Leaf size={16} className="text-sage-500" />
              <h3 className="font-display font-semibold">{herb.name}</h3>
            </div>
            <p className="text-xs italic text-ink/40 mb-2">{herb.latinName}</p>
            <p className="text-sm text-ink/70 leading-relaxed mb-3">{herb.uses}</p>
            <span className="text-xs font-medium text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
              Сезон: {SEASON_LABELS[herb.season]}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HerbsPage;
