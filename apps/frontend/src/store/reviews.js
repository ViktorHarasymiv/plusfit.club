import { create } from "zustand";
import { ALL_REVIEWS } from "../services/reviews";

export const useReviewStore = create((set) => ({
  reviews: [],
  averageRating: 0,
  loading: false,
  error: null,

  fetchReviews: async (params = {}) => {
    set({ loading: true, error: null });

    try {
      const response = await ALL_REVIEWS(params);
      const reviews = response.data || [];

      const averageRating = reviews.length
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

      set({
        reviews,
        averageRating: Math.round(averageRating * 10) / 10, // округлення до 1 знаку
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Помилка при завантаженні",
        loading: false,
      });
    }
  },
}));
