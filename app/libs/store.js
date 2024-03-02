import { create } from "zustand";

// Onboarding form state
export const useJoinForm = create((set) => ({
  paymentPanel: 0,
  setPaymentPanel: (value) => set({ paymentPanel: value }),
  clientInfo: {},
  setClientInfo: (info) => set({ clientInfo: info }),
  premiereSignup: false,
  setpremiereSignup: (bool) => set({ premiereSignup: bool }),
}));
