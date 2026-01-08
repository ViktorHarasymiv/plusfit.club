import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../config/api";

export const useEmotionsStore = create((set) => ({
  emotions: [],
  fetchEmotions: async () => {
    const res = await axios.get(`${API_URL}/emotions`);
    set({ emotions: res.data.data });
  },
  createRecord: async () => {
    const res = await axios.get(`${API_URL}/emotions`);
    return res;
  },
}));
