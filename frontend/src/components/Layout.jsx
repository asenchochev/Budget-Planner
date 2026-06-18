import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Wallet, ShoppingCart, BarChart3, Leaf, Sprout, LogOut, Menu, X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/", label: "Табло", icon: LayoutDashboard },
  { to: "/budget", label: "Бюджет", icon: Wallet },
  { to: "/shopping-list", label: "Списък за пазаруване", icon: ShoppingCart },
  { to: "/analytics", label: "Анализи", icon: BarChart3 },
  { to: "/seasonal", label: "Сезонни продукти", icon: Sprout },
  { to: "/herbs", label: "Билки", icon: Leaf },
];

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const NavLinks = ({ onClick }) => (
    <>
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClick}
          end={to === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? "bg-sage-500 text-white" : "text-ink/70 hover:bg-sage-50"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-sand flex">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-sage-100 bg-white px-4 py-6 shrink-0">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-sage-500 flex items-center justify-center text-white font-display font-bold">
            B
          </div>
          <span className="font-display font-semibold text-lg">Budget Planner</span>
        </div>
        <nav className="flex flex-col gap-1">
          <NavLinks />
        </nav>
        <div className="mt-auto pt-4 border-t border-sage-100">
          <p className="text-xs text-ink/40 px-3.5 mb-2">Логнат(а) като {user?.name}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-clay-600 hover:bg-clay-50 transition-colors w-full"
          >
            <LogOut size={18} />
            Изход
          </button>
        </div>
      </aside>

      {/* Topbar - mobile */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-sage-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sage-500 flex items-center justify-center text-white font-display font-bold text-sm">
            B
          </div>
          <span className="font-display font-semibold">Budget Planner</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/30" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-14 left-0 right-0 bg-white border-b border-sage-100 px-4 py-4 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <NavLinks onClick={() => setMobileOpen(false)} />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-clay-600 hover:bg-clay-50 transition-colors mt-2 border-t border-sage-100 pt-3"
            >
              <LogOut size={18} />
              Изход
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 mt-14 md:mt-0 max-w-6xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;
