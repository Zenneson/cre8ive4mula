import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useSessionStorage = createJSONStorage(() => sessionStorage);

// Portal State
export const usePortalState = create((set) => ({
  allowReorder: false,
  setAllowReorder: (value) => set({ allowReorder: value }),
  activePanel: 0,
  setActivePanel: (value) => set({ activePanel: value }),
  loaded: false,
  setLoaded: (value) => set({ loaded: value }),
  drawerOpen: false,
  setDrawerOpen: (value) => set({ drawerOpen: value }),
}));

// Submission Data
export const useSubissionData = create(
  persist(
    (set) => ({
      submissionPanel: 0,
      setSubmissionPanel: (value) => set({ submissionPanel: value }),
      formData: {
        type: "",
        title: "",
        service: "",
        goal: "",
        description: "",
        styleKeywords: [],
        deliveryFormats: [],
        websites: [],
        colors: [],
        files: [],
      },
      setFormData: (newFormData) =>
        set((state) => ({
          formData: { ...state.formData, ...newFormData },
        })),
    }),
    {
      name: "submissionData",
      storage: useSessionStorage,
    }
  )
);
