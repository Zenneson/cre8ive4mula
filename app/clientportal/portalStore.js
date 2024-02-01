import { create } from "zustand";
import { persist } from "zustand/middleware";

const sessionStore = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: (name) => sessionStorage.removeItem(name),
};

// Portal State
export const usePortalState = create((set) => ({
  allowReorder: false,
  setAllowReorder: (value) => set({ allowReorder: value }),
}));

// App State
export const useChatState = create(
  persist(
    (set) => ({
      chatOpened: false,
      setChatOpened: (value) => set({ chatOpened: value }),
    }),
    {
      name: "appState",
      storage: sessionStore,
      partialize: (state) => ({ chatOpened: state.chatOpened }),
    }
  )
);
