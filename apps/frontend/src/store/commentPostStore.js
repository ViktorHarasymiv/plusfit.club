import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const useCommentStore = create((set) => ({
  data: null,
  userComment: null,
  loading: false,
  error: null,
  pagination: {
    page: 0,
    perPage: 0,
    totalPages: 0,
    totalItems: 0,
  },

  // ============================
  // GET all comments
  // ============================

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
        `${API_URL}/posts/comments/post/${postId}?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
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

  // ============================
  // GET comments by USER ID
  // ============================

  getCommentsByUser: async (userId) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get(`${API_URL}/posts/comments/user/${userId}`);

      set({
        userComment: res.data.data || [],
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Не вдалося завантажити коментарі користувача",
        loading: false,
      });
    }
  },

  // ============================
  // DELETE comment by ID
  // ============================

  deleteComment: async (commentId) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`${API_URL}/posts/comments/${commentId}`);

      set({
        data: (get().data || []).filter((c) => c._id !== commentId),
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err.response?.data?.message ||
          err.message ||
          "Не вдалося видалити коментар",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
