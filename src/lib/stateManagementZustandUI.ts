import { create } from "zustand";
import { persist } from "zustand/middleware";

type UiState = {
  sidebarCollapsed: boolean;
  lastVisitedPage: string;

  toggleSidebar: () => void;
  setLastVisitedPage: (page: string) => void;
};

export const stateManagementZustandUI = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: true,
      lastVisitedPage: "",

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setLastVisitedPage: (page: string) => set({ lastVisitedPage: page }),
    }),
    {
      name: "ui-store", // localStorage key
    },
  ),
);
