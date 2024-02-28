import { create } from "zustand";

// Onboarding form state
export const useJoinForm = create((set) => ({
  clientInfo: {},
  setClientInfo: (info) => set({ clientInfo: info }),
}));
