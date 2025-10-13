import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const usePortfolioStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchPortfolio: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/portfolio`);
      set({ data: res.data.result.data, loading: false });
    } catch (err) {
      set({ error: "Помилка при завантаженні", loading: false });
    }
  },
}));
