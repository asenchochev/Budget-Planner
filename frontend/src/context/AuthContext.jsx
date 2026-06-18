import React, { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // При първоначално зареждане - ако има токен, опитваме да заредим текущия user
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const cachedUser = localStorage.getItem("user");

      if (token && cachedUser) {
        try {
          setUser(JSON.parse(cachedUser));
          const freshUser = await authService.getMe();
          setUser(freshUser);
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email }));
    setUser({ _id: data._id, name: data.name, email: data.email });
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    persistSession(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    persistSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth трябва да се ползва вътре в <AuthProvider>");
  return ctx;
};
