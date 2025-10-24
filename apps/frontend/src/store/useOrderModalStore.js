// store/useAuthModalStore.ts
import { create } from "zustand";

export const useOrderModalStore = create((set) => ({
  isOrderModal: false,
  payload: null,
  openOrderModal: (data) => set({ isOrderModal: true, payload: data }),
  closeOrderModal: () => set({ isOrderModal: false, payload: null }),

  closeAll: () => set({ isOrderModal: false }),
}));
