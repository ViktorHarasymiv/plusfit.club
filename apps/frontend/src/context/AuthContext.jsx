import axios from "axios";
import isEqual from "lodash.isequal";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  checkSession,
  editProfile,
  getMe,
  logout,
  refreshSession,
} from "../services/auth";

import { login } from "../services/auth.js";

import Loader from "../components/ui/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api.js";

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

  const patchUser = async (data) => {
    return await editProfile(data);
  };

  const getLogout = async () => {
    await logout();
    navigate("/");
    setUser(null);
  };

  const getRefreshSession = async () => {
    await refreshSession();
  };

  const loginWithGoogleCode = async (code) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/confirm-oauth`,
        { code },
        { withCredentials: true }
      );
      const { user } = res.data.data;

      if (user) {
        setUser(user);
        setAuthorized(true);
      }
    } catch (err) {
      console.error("❌ Google login failed:", err);
      setAuthorized(false);
      setUser(null);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      let isAuthenticated = await checkSession();

      if (!isAuthenticated) {
        console.log("⚠️ Session invalid, trying refresh...");
        await getRefreshSession();
        isAuthenticated = await checkSession();
      }

      if (!isAuthenticated) {
        setAuthorized(false);
        console.log("❌ Refresh failed");
        return;
      }

      const user = await getMe();
      if (user) {
        setUser((prev) => (isEqual(prev, user) ? prev : user));
        setAuthorized(true);
        console.log("✅ Session valid");
      } else {
        setAuthorized(false);
        console.log("⚠️ No user returned");
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

  const authValue = useMemo(
    () => ({
      loading,
      user,
      authorized,
      patchUser,
      getLogin,
      fetchUser,
      register,
      getLogout,
      refreshSession,
      loginWithGoogleCode,
    }),
    [user, authorized, loading]
  );

  return (
    <AuthContext.Provider value={authValue}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
