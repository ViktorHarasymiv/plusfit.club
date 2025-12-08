import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const useCommentStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  },

  getCommentPost: async (
    postId,
    page = 1,
    perPage = 3,
    sortBy = "createdAt",
    sortOrder = "desc" // нові першими
  ) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${API_URL}/posts/comments/${postId}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );

      set({
        data: res.data.data || [],
        pagination: {
          totalPages: res.data.totalPages || 0,
          currentPage: res.data.currentPage || page,
          totalItems: res.data.totalItems || 0,
          hasMore: res.data.currentPage < res.data.totalPages, // зручно для infinite scroll
        },
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
