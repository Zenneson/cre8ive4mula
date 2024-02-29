import { create } from "zustand";

// Onboarding form state
export const useJoinForm = create((set) => ({
  clientInfo: {},
  setClientInfo: (info) => set({ clientInfo: info }),
  premiereSignup: false,
  setpremiereSignup: (bool) => set({ premiereSignup: bool }),
}));
