// store/useAuthModalStore.ts
import { create } from "zustand";

export const useAuthModalStore = create((set) => ({
  isSignInOpen: false,
  isSignUpOpen: false,

  openSignIn: () => set({ isSignInOpen: true }),
  closeSignIn: () => set({ isSignInOpen: false }),

  openSignUp: () => set({ isSignUpOpen: true }),
  closeSignUp: () => set({ isSignUpOpen: false }),

  closeAll: () => set({ isSignInOpen: false, isSignUpOpen: false }),
}));
