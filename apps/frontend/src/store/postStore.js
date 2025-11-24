import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const usePostStore = create((set) => ({
  content: [],
  selfPost: [],
  loading: false,
  error: null,
  pagination: {
    page: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  },

  get_post: async (params = {}) => {
    set({ loading: true, error: null });

    const {
      page = 1,
      perPage = 3,
      sortBy = "createdAt",
      sortOrder = "asc",
      tags,
      author,
      isFeatured,
    } = params;

    const query = new URLSearchParams({
      page,
      perPage,
      sortBy,
      sortOrder,
      ...(tags ? { tags: tags.join(",") } : {}),
      ...(author ? { author } : {}),
      ...(isFeatured !== undefined ? { isFeatured } : {}),
    });

    try {
      const res = await axios.get(`${API_URL}/posts?${query.toString()}`);
      set({
        content: res.data.data.data,
        pagination: {
          page,
          perPage,
          totalPages: res.data.totalPages || 1,
          totalItems: res.data.totalItems || res.data.data.length,
        },
        loading: false,
      });
    } catch (err) {
      set({ error: err.message || "Помилка при завантаженні", loading: false });
    }
  },

  getPostById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/posts/${id}`);
      set({
        selfPost: res.data.data, // якщо бекенд повертає { data: {...} }
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Помилка при завантаженні",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
