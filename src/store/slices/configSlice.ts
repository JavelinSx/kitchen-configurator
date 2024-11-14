// src/store/slices/configSlice.ts
import { StateCreator } from 'zustand';
import { ConfiguratorEvent, StoreState } from '@/types';

export interface ConfigSlice {
  currentStep: number;
  isConfiguring: boolean;
  setStep: (step: number) => void;
}

export const createConfigSlice: StateCreator<StoreState, [], [], ConfigSlice> = (set) => ({
  currentStep: 0,
  isConfiguring: false,
  setStep: (step) => {
    set((state) => ({
      currentStep: step,
      history: [...state.history, { type: 'STEP_CHANGED', stepId: step } as ConfiguratorEvent],
      lastUpdate: new Date(),
    }));
  },
});
