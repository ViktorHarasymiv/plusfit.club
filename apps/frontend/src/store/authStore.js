import { create } from "zustand";
import isEqual from "lodash.isequal";
import {
  login,
  checkSession,
  getMe,
  logout,
  refreshSession,
  editProfile,
} from "../services/auth";
import axios from "axios";
import { API_URL } from "../config/api";

export const useAuthStore = create((set, get) => ({
  user: null,
  authorized: null,
  loading: false,

  setUser: (user) =>
    set((state) => ({
      user: isEqual(state.user, user) ? state.user : user,
    })),

  setAuthorized: (value) => set({ authorized: value }),

  setLoading: (value) => set({ loading: value }),

  getLogin: async (data) => {
    const res = await login(data);
    const user = res.data.user;
    if (user) {
      set({ user, authorized: true });
    }
  },

  register: async (data) => {
    const res = await axios.post("/auth/register", data, {
      withCredentials: true,
    });
    set({ user: res.data.user });
  },

  patchUser: async (data) => {
    return await editProfile(data);
  },

  getLogout: async () => {
    await logout();
    set({ user: null, authorized: false });
  },

  getRefreshSession: async () => {
    await refreshSession();
  },

  loginWithGoogleCode: async (code) => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/confirm-oauth`,
        { code },
        { withCredentials: true }
      );
      const { user } = res.data.data;
      if (user) {
        set({ user, authorized: true });
      }
    } catch (err) {
      console.error("❌ Google login failed:", err);
      set({ authorized: false, user: null });
    }
  },

  fetchUser: async () => {
    const { setLoading, setAuthorized, setUser, getRefreshSession } = get();
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
        setUser(user);
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
  },
}));
