import { create } from "zustand";

// Onboarding form state
export const useSignupForm = create((set) => ({
  paymentPanel: -1,
  setPaymentPanel: (value) => set({ paymentPanel: value }),
  clientInfo: {},
  setClientInfo: (info) => set({ clientInfo: info }),
  signupAccount: "",
  setSignupAccount: (value) => set({ signupAccount: value }),
}));
