// src/store/slices/uiSlice.ts
import { StateCreator } from 'zustand';
import type { UISlice, KitchenStore } from '@/types';

export const createUISlice: StateCreator<KitchenStore, [], [], UISlice> = (set) => ({
  activeModal: null,
  tooltips: new Map(),
  isLoading: false,

  setActiveModal: (modalId: string | null) => {
    set({ activeModal: modalId });
  },

  setTooltip: (tooltipId: string, isVisible: boolean) => {
    set((state) => {
      const newTooltips = new Map(state.tooltips);
      newTooltips.set(tooltipId, isVisible);
      return { tooltips: newTooltips };
    });
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
});
