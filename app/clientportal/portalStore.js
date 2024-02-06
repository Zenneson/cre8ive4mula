import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useSessionStorage = createJSONStorage(() => sessionStorage);

// Portal State
export const usePortalState = create((set) => ({
  allowReorder: false,
  setAllowReorder: (value) => set({ allowReorder: value }),
  activePanel: 0,
  setActivePanel: (value) => set({ activePanel: value }),
}));

export const useSubissionData = create(
  persist(
    (set) => ({
      choosenType: "",
      setChoosenType: (value) => set({ choosenType: value }),
      submissionPanel: 0,
      setSubmissionPanel: (value) => set({ submissionPanel: value }),
    }),
    {
      name: "submissionData",
      storage: useSessionStorage,
    }
  )
);
