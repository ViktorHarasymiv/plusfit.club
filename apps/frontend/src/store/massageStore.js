import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const massagePriceList = create((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchMassagePriceList: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/massage`);
      set({ data: res.data.result.data, loading: false });
    } catch (err) {
      set({ error: "Помилка при завантаженні", loading: false });
    }
  },
}));
