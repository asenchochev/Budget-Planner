import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORIES } from "../utils/constants";

const EMPTY_FORM = { name: "", price: "", quantity: 1, category: CATEGORIES[0] };

/**
 * Модал за добавяне/редакция на продукт в списъка за пазаруване.
 * Ако се подаде initialData - работи в режим "редакция".
 */
const ItemForm = ({ open, onClose, onSubmit, initialData = null }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        price: initialData.price,
        quantity: initialData.quantity,
        category: initialData.category,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10),
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
      <div className="card w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">
            {initialData ? "Редакция на продукт" : "Нов продукт"}
          </h3>
          <button onClick={onClose} className="text-ink/40 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-text">Име на продукта</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-field"
              placeholder="напр. Домати"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-text">Цена (лв.)</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input-field"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="label-text">Количество</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="input-field"
                min="1"
                required
              />
            </div>
          </div>

          <div>
            <label className="label-text">Категория</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Отказ
            </button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? "Запазване..." : initialData ? "Запази" : "Добави"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
