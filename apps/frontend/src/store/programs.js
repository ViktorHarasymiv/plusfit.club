import { create } from "zustand";
import axios from "axios";

import { API_URL } from "../config/api.js";

export const useProgramsStore = create((set, get) => ({
  programs: [],
  programOptions: [],
  activeProgram: [],
  loading: false,
  error: null,

  // -----------------------------
  // LOAD ALL (public + user)
  // -----------------------------
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

  // -----------------------------
  // LOAD LIST (public + user)
  // -----------------------------

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

  // -----------------------------
  // LOAD BY ID (public + user)
  // -----------------------------

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

  // -----------------------------
  // SET ACTIVE
  // -----------------------------
  setActiveProgram: (programId) => {
    const program = get().programs.find((p) => p._id === programId);
    if (program) set({ activeProgram: program });
  },

  // -----------------------------
  // ADD NEW DAY TO PROGRAM
  // -----------------------------
  addDay: async (programId, title) => {
    try {
      const { data: updatedProgram } = await axios.post(
        `/api/programs/${programId}/days`,
        { title }
      );

      // Оновлюємо список програм
      set((state) => ({
        programs: state.programs.map((p) =>
          p._id === programId ? updatedProgram : p
        ),
        activeProgram:
          state.activeProgram?._id === programId
            ? updatedProgram
            : state.activeProgram,
      }));
    } catch (err) {
      console.error("Error adding day:", err);
    }
  },

  // -----------------------------
  // ADD EXERCISE TO DAY
  // -----------------------------
  addExercise: async (programId, dayId, exerciseName) => {
    try {
      const { data: updatedProgram } = await axios.post(
        `/api/programs/${programId}/days/${dayId}/exercises`,
        { name: exerciseName }
      );

      set((state) => ({
        programs: state.programs.map((p) =>
          p._id === programId ? updatedProgram : p
        ),
        activeProgram:
          state.activeProgram?._id === programId
            ? updatedProgram
            : state.activeProgram,
      }));
    } catch (err) {
      console.error("Error adding exercise:", err);
    }
  },

  // -----------------------------
  // UPDATE DAY TITLE / HIDDEN / EDITABLE
  // -----------------------------
  updateDay: async (programId, dayId, updates) => {
    try {
      const { data: updatedProgram } = await axios.put(
        `/api/programs/${programId}/days/${dayId}`,
        updates
      );

      set((state) => ({
        programs: state.programs.map((p) =>
          p._id === programId ? updatedProgram : p
        ),
        activeProgram:
          state.activeProgram?._id === programId
            ? updatedProgram
            : state.activeProgram,
      }));
    } catch (err) {
      console.error("Error updating day:", err);
    }
  },

  // -----------------------------
  // UPDATE EXERCISE
  // -----------------------------
  updateExercise: async (programId, dayId, exerciseId, updates) => {
    try {
      const { data: updatedProgram } = await axios.put(
        `/api/programs/${programId}/days/${dayId}/exercises/${exerciseId}`,
        updates
      );

      set((state) => ({
        programs: state.programs.map((p) =>
          p._id === programId ? updatedProgram : p
        ),
        activeProgram:
          state.activeProgram?._id === programId
            ? updatedProgram
            : state.activeProgram,
      }));
    } catch (err) {
      console.error("Error updating exercise:", err);
    }
  },
}));
