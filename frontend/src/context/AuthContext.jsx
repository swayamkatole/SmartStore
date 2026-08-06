import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login({ email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const register = async (email, password, fullName) => {
    const res = await authApi.register({ email, password, fullName });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);