import { create } from "zustand";
import { persist } from "zustand/middleware";

const sessionStore = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: (name) => sessionStorage.removeItem(name),
};

// App State
export const useAppState = create(
  persist(
    (set) => ({
      mainMenuOpened: false,
      setMainMenuOpened: (value) => set({ mainMenuOpened: value }),
      // chatOpened: false,
      // setChatOpened: (value) => set({ chatOpened: value }),
    })
    // {
    //   name: "appState",
    //   storage: sessionStore,
    //   partialize: (state) => ({ chatOpened: state.chatOpened }),
    // }
  )
);
