import { create } from "zustand";

// Homepage State
export const useHomeState = create((set) => ({
  homePageTabs: 0,
  setHomePageTabs: (value) => set({ homePageTabs: value }),
}));

export const useAppState = create((set) => ({
  mainMenuOpened: false,
  setMainMenuOpened: (value) => set({ mainMenuOpened: value }),
}));
