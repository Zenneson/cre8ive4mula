import { create } from "zustand";
import { persist } from "zustand/middleware";

const sessionStore = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: (name) => sessionStorage.removeItem(name),
};

// Portal State
export const usePortalState = create(
  persist(
    (set) => ({
      allowReorder: false,
      setAllowReorder: (value) => set({ allowReorder: value }),
      activePanel: 0,
      setActivePanel: (value) => set({ activePanel: value }),
      choosenType: "",
      setChoosenType: (value) => set({ choosenType: value }),
    }),
    {
      name: "portalState",
      storage: sessionStore,
      partialize: (state) => ({
        chosenType: state.chosenType,
      }),
    }
  )
);
