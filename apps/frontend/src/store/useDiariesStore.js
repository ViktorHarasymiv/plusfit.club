import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useDiariesStore = create((set, get) => ({
  diaries: [],
  currentNote: null,
  loading: false,
  error: null,

  // -----------------------------
  // GET ALL DIARIES
  // -----------------------------
  fetchDiaries: async (page = 1) => {
    try {
      set({ loading: true, error: null });

      const params = new URLSearchParams({
        page: page.toString(),
      });

      const res = await axios.get(`${API_URL}/diaries`, {
        params,
        withCredentials: true,
      });

      set({
        diaries: res.data.result.data,
        loading: false,
      });

      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load diaries",
        loading: false,
      });
      throw err;
    }
  },

  // -----------------------------
  // GET BY ID DIARIE
  // -----------------------------

  fetchDiarieById: async (id) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/diaries/${id}`);
      set({ currentNote: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // -----------------------------
  // CREATE DIARY
  // -----------------------------

  createDiary: async (values) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post(`${API_URL}/diaries`, values, {
        withCredentials: true,
      });

      set({
        diaries: [...get().diaries, res.data.data],
        loading: false,
      });

      return res.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to create diary",
        loading: false,
      });
      throw err;
    }
  },

  // -----------------------------
  // UPDATE DIARY
  // -----------------------------
  updateDiary: async ({ id, values }) => {
    try {
      set({ loading: true, error: null });

      const response = await axios.patch(`${API_URL}/diaries/${id}`, values, {
        withCredentials: true,
      });

      set({
        currentNote: response.data.data.diary,
        loading: false,
      });

      return response.data.data;
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update diary",
        loading: false,
      });
      throw err;
    }
  },

  // -----------------------------
  // DELETE DIARY
  // -----------------------------
  deleteDiary: async (id) => {
    try {
      set({ loading: true, error: null });

      await axios.delete(`${API_URL}/diaries/${id}`, {
        withCredentials: true,
      });

      set({
        diaries: get().diaries.filter((d) => d._id !== id),
        loading: false,
      });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to delete diary",
        loading: false,
      });
      throw err;
    }
  },
}));
