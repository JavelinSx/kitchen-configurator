// src/types/config.ts
import { ModuleType } from './modules';

export interface ConfigStep {
  id: number;
  name: string;
  description: string;
  requiredModules: ModuleType[];
  nextStep?: number;
  prevStep?: number;
  tip: string;
}

export interface ConfigState {
  currentStep: number;
  isConfiguring: boolean;
}

export interface ConfigActions {
  setStep: (step: number) => void;
}

export type ConfigSlice = ConfigState & ConfigActions;
