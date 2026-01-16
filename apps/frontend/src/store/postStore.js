import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../config/api";

export const usePostStore = create((set) => ({
  content: null,
  selfPost: null,
  categoryCount: null,
  recentPost: null,
  comment: null,
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
      sortOrder = "desc",
      sortBy = "createdAt",
      tags = "",
      filterBy = "",
      category = "",
    } = params;

    // якщо tags масив → перетворюємо у рядок через кому
    const tagsParam = Array.isArray(tags) ? tags.join(",") : tags;

    const categoryParam = Array.isArray(category)
      ? category.join(",")
      : category;

    const query = new URLSearchParams({
      page,
      perPage,
      sortOrder,
      sortBy,
      ...(tagsParam ? { tags: tagsParam } : {}),
      ...(filterBy ? { filterBy } : {}),
      ...(categoryParam ? { category: categoryParam } : {}),
    });

    try {
      const res = await axios.get(`${API_URL}/posts?${query.toString()}`);

      set({
        content: res.data.posts,
        pagination: {
          page,
          perPage,
          totalPages: res.data.totalPages || 1,
          totalItems: res.data.totalItems || res.data.posts.length,
        },
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message || "Помилка при завантаженні",
        loading: false,
      });
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

  getCategoryCount: async () => {
    const res = await axios.get(`${API_URL}/posts/category-counts`);
    set({
      categoryCount: res.data,
    });
  },

  getRecentByLikes: async () => {
    const res = await axios.get(`${API_URL}/posts/recent-by-likes`);
    set({ recentPost: res.data, loading: false });
  },

  clearError: () => set({ error: null }),
}));
