import { create } from "zustand";

export const useModalStore = create((set) => ({
  isModalOpen: false,

  openModal: () => {
    document.body.style.overflow = "hidden";
    set({ isModalOpen: true });
  },

  closeModal: () => {
    document.body.style.overflow = "auto";
    set({ isModalOpen: false });
  },

  toggleModal: () =>
    set((state) => {
      const next = !state.isModalOpen;
      document.body.style.overflow = next ? "hidden" : "auto";
      return { isModalOpen: next };
    }),
}));
