import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const api = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkSession();
  }, [hasAccess]);

  const checkSession = async () => {
    try {
      const response = await fetch(`${api}auth/check-session`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        setHasAccess(true);
        setUser(data.user.name); // якщо бекенд повертає дані користувача
      } else {
        setHasAccess(false);
        setUser(null);
      }
    } catch {
      setHasAccess(false);
      setUser(null);
    }
  };

  const login = async (email, password) => {
    const response = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      setHasAccess(true);

      setUser(result.data.userName);
    } else {
      throw new Error(result.message);
    }
  };

  const logout = async () => {
    await fetch(`${api}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/");
    setHasAccess(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ logout, login, user, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
