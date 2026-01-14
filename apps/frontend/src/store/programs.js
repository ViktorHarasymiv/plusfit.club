import { create } from "zustand";
import axios from "axios";

import { API_URL } from "../config/api.js";

export const useProgramsStore = create((set, get) => ({
  programs: [],
  programOptions: [],
  activeProgram: [],
  loading: false,
  error: null,

  // LOAD ALL (public + user)

  fetchPrograms: async (userId) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/programs`, {
        params: { userId },
      });

      set({ programs: data });

      if (!get().activeProgram && data.length > 0) {
        set({ activeProgram: data[0] });
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  // LOAD LIST (public + user)

  fetchProgramOptions: async (userId) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/programs/list`, {
        params: { userId },
      });

      // data = [{ _id: "...", name: "Push Day" }, ...]
      set({ programOptions: data });

      return data; // якщо хочеш використовувати результат у компоненті
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // LOAD BY ID (public + user)

  fetchProgramById: async (id) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(`${API_URL}/programs/${id}`);
      set({ activeProgram: data });
      return data;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // SET ACTIVE

  setActiveProgram: (programId) => {
    const program = get().programs.find((p) => p._id === programId);
    if (program) set({ activeProgram: program });
  },

  // CREATE

  createProgram: async (data) => {
    try {
      const res = await axios.post(`${API_URL}/programs`, data);

      // додаємо нову програму в локальний store
      set((state) => ({
        programs: [...state.programs, res.data],
      }));

      return res.data;
    } catch (err) {
      console.error("Error creating program:", err);
      throw err;
    }
  },

  // PATCH PROGRAM

  updateProgram: async (programId, updatedData) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.patch(
        `${API_URL}/programs/${programId}`,
        updatedData
      );

      // Оновлюємо activeProgram
      set({ activeProgram: data.program });

      // Оновлюємо programs у списку (якщо він завантажений)
      set({
        programs: get().programs.map((p) =>
          p._id === programId ? data.program : p
        ),
      });

      return data.program;
    } catch (err) {
      set({ error: err.message });
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
