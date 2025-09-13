import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  activeTab: "dash", 
  setActiveTab: (tabId) => set({ activeTab: tabId }),
}));
