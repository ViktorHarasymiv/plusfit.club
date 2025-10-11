import { create } from "zustand";

export const useFullscreenStore = create((set) => ({
  isOpen: false,
  imageSrc: null,
  open: (src) => set({ isOpen: true, imageSrc: src }),
  close: () => set({ isOpen: false, imageSrc: null }),
}));
