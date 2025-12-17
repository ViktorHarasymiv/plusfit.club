import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const useMainConfigStore = create((set) => ({
  config: null,
  loading: false,
  error: null,

  getMainConfig: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/main-config`);
      set({ config: res.data, loading: false });
    } catch (err) {
      set({ error: err.message || "Помилка при отриманні", loading: false });
    }
  },
}));
