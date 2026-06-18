import React, { useEffect, useState } from "react";
import { Plus, Filter } from "lucide-react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ItemRow from "../components/ItemRow";
import ItemForm from "../components/ItemForm";
import { getItems, createItem, updateItem, deleteItem, togglePurchased } from "../services/itemService";
import { CATEGORIES } from "../utils/constants";
import { formatCurrency } from "../utils/format";

const ShoppingListPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadItems = async () => {
    const params = categoryFilter ? { category: categoryFilter } : {};
    const data = await getItems(params);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const handleCreate = async (payload) => {
    await createItem(payload);
    toast.success("Продуктът е добавен");
    loadItems();
  };

  const handleUpdate = async (payload) => {
    await updateItem(editingItem._id, payload);
    toast.success("Продуктът е обновен");
    setEditingItem(null);
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    toast.success("Продуктът е изтрит");
    loadItems();
  };

  const handleToggle = async (id) => {
    await togglePurchased(id);
    loadItems();
  };

  const pending = items.filter((i) => !i.purchased);
  const purchased = items.filter((i) => i.purchased);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading) return <Layout><Loader /></Layout>;

  return (
    <Layout>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display font-semibold text-2xl">Списък за пазаруване</h1>
          <p className="text-ink/50 text-sm mt-1">Общо: {formatCurrency(total)} ({items.length} продукта)</p>
        </div>
        <button onClick={() => { setEditingItem(null); setFormOpen(true); }} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Нов продукт
        </button>
      </div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        <Filter size={15} className="text-ink/40 shrink-0" />
        <button
          onClick={() => setCategoryFilter("")}
          className={`text-xs font-medium px-3 py-1.5 rounded-full shrink-0 transition-colors ${
            categoryFilter === "" ? "bg-sage-500 text-white" : "bg-sage-50 text-ink/60"
          }`}
        >
          Всички
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full shrink-0 transition-colors ${
              categoryFilter === cat ? "bg-sage-500 text-white" : "bg-sage-50 text-ink/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-ink/40 text-sm">Списъкът е празен. Добавете първия продукт.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {pending.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-2 px-1">
                За купуване ({pending.length})
              </h3>
              <div className="space-y-2">
                {pending.map((item) => (
                  <ItemRow
                    key={item._id}
                    item={item}
                    onTogglePurchased={handleToggle}
                    onEdit={(it) => { setEditingItem(it); setFormOpen(true); }}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {purchased.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-ink/40 uppercase tracking-wide mb-2 px-1">
                Купени ({purchased.length})
              </h3>
              <div className="space-y-2">
                {purchased.map((item) => (
                  <ItemRow
                    key={item._id}
                    item={item}
                    onTogglePurchased={handleToggle}
                    onEdit={(it) => { setEditingItem(it); setFormOpen(true); }}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ItemForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditingItem(null); }}
        onSubmit={editingItem ? handleUpdate : handleCreate}
        initialData={editingItem}
      />
    </Layout>
  );
};

export default ShoppingListPage;
