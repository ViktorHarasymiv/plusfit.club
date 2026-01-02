import { create } from "zustand";
import axios from "axios";

const API_URL = "https://energyflow.b.goit.study/api";

export const useExercisesStore = create((set, get) => ({
  exercises: [],
  exercise: null,
  filters: [],
  loading: false,
  error: null,
  total: 0,

  // -----------------------------
  // GET EXERCISES (with filters)
  // -----------------------------
  getExercises: async (params = {}) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/exercises`, { params });

      set({
        exercises: data.results || data,
        total: data.total || 0,
      });

      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // -----------------------------
  // GET EXERCISES (clean array filters)
  // -----------------------------

  getCleanExercises: () => {
    set({
      exercises: [],
      total: 0,
    });
  },

  // -----------------------------
  // GET EXERCISE BY ID
  // -----------------------------
  getExerciseById: async (id) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/exercises/${id}`);
      set({ exercise: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // -----------------------------
  // FILTERS
  // -----------------------------
  getFilters: async (filter, page = 1, limit = 12) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/filters`, {
        params: { filter, page, limit },
      });

      set({
        filters: data.results,
        total: data.total,
        currentFilter: filter,
        page,
        limit,
      });

      return data.results;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
