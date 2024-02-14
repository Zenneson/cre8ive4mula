import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useSessionStorage = createJSONStorage(() => sessionStorage);

// Portal State
export const usePortalState = create(
  persist(
    (set) => ({
      allowReorder: false,
      setAllowReorder: (value) => set({ allowReorder: value }),
      loaded: false,
      setLoaded: (value) => set({ loaded: value }),
      drawerOpen: false,
      setDrawerOpen: (value) => set({ drawerOpen: value }),
      drawerState: "init",
      setDrawerState: (value) => set({ drawerState: value }),
      activePanel: 0,
      setActivePanel: (value) => set({ activePanel: value }),
    }),
    {
      name: "portalState",
      storage: useSessionStorage,
    }
  )
);

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
        desc: "",
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
