import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Регистрацията е успешна!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Грешка при регистрация");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-sage-500 flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-3">
            B
          </div>
          <h1 className="font-display font-semibold text-2xl">Създайте профил</h1>
          <p className="text-ink/50 text-sm mt-1">Започнете да следите бюджета си</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="label-text">Име</label>
            <input
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-text">Имейл</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="label-text">Парола</label>
            <input
              type="password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              minLength={6}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Регистрация..." : "Регистрация"}
          </button>
        </form>

        <p className="text-center text-sm text-ink/50 mt-5">
          Вече имате профил?{" "}
          <Link to="/login" className="text-sage-600 font-medium hover:underline">
            Влезте
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
