import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const usePostStore = create((set, get) => ({
  data: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    perPage: 8,
    totalPages: 0,
    totalItems: 0,
  },

  get_post: async (params = {}) => {
    set({ loading: true, error: null });

    const {
      page = 1,
      perPage = 8,
      sortBy = "createdAt",
      sortOrder = "asc",
      tags,
      author,
      isFeatured,
      isPrivate,
    } = params;

    const query = new URLSearchParams({
      page,
      perPage,
      sortBy,
      sortOrder,
      ...(tags ? { tags: tags.join(",") } : {}),
      ...(author ? { author } : {}),
      ...(isFeatured !== undefined ? { isFeatured } : {}),
      ...(isPrivate !== undefined ? { isPrivate } : {}),
    });

    try {
      const res = await axios.get(`${API_URL}/posts?${query.toString()}`);
      set({
        data: res.data.data,
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

  clearError: () => set({ error: null }),
}));
