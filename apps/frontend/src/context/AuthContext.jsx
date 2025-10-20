import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { checkSession, getMe, logout, refreshSession } from "../services/auth";

import { login } from "../services/auth.js";

import Loader from "../components/ui/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLogin = async (data) => {
    const res = await login(data);
    const user = res.data.user;
    if (user) {
      setUser(user);
      setAuthorized(true);
    }
  };

  const register = async (data) => {
    const res = await axios.post("/auth/register", data, {
      withCredentials: true,
    });
    setUser(res.data.user);
  };

  const getLogout = async () => {
    await logout();
    navigate("/");
    setUser(null);
  };

  const getRefreshSession = async () => {
    await refreshSession();
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
          setAuthorized(true);
          console.log("✅ Session valid");
        } else {
          setAuthorized(false);
          console.log("⚠️ No user returned");
        }
      } else {
        console.log("⚠️ Session invalid, trying refresh...");
        await getRefreshSession();

        const isAuthenticatedAfterRefresh = await checkSession();
        if (isAuthenticatedAfterRefresh) {
          const user = await getMe();
          if (user) {
            setUser(user);
            setAuthorized(true);
            console.log("✅ Session refreshed");
          } else {
            setAuthorized(false);
            console.log("⚠️ No user after refresh");
          }
        } else {
          setAuthorized(false);
          console.log("❌ Refresh failed");
        }
      }
    } catch (err) {
      setAuthorized(false);
      console.error("❌ Session check error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authorized,
        loading,
        getLogin,
        fetchUser,
        register,
        getLogout,
        refreshSession,
      }}
    >
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
