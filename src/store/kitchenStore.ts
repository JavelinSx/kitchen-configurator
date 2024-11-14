// src/store/kitchenStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StoreState, KitchenStore } from '@/types';

import { createMaterialsSlice } from './slices/materialsSlice';
import { createModulesSlice } from './slices/modulesSlice';
import { createConfigSlice } from './slices/configSlice';
import { createHistorySlice } from './slices/historySlice';
import { createAnimationSlice } from './slices/animationSlice';
import { createCameraSlice } from './slices/cameraSlice';
import { createUISlice } from './slices/uiSlice';
import { createScrollSlice } from './slices/scrollSlice';

// Создаем начальное состояние
const initialState: StoreState = {
  // Materials
  selectedMaterials: new Map(),

  // Modules
  selectedModules: new Map(),
  totalPrice: 0,

  // Animation
  activeAnimations: new Map(),
  isAnimating: false,
  pausedAnimations: new Map(),

  // Config
  currentStep: 0,
  isConfiguring: false,

  // History
  history: [],
  undoStack: [],
  lastUpdate: new Date(),

  // Camera
  position: { x: 0, y: 0, z: 0 },
  target: { x: 0, y: 0, z: 0 },
  zoom: 1,

  // UI
  activeModal: null,
  tooltips: new Map(),
  isLoading: false,

  // Scroll
  progress: 0,
  direction: 'down',
  currentSection: 'intro',
};

// Создаем store с начальным состоянием
export const useKitchenStore = create<KitchenStore>()(
  devtools(
    (...a) => ({
      ...initialState,
      ...createMaterialsSlice(...a),
      ...createModulesSlice(...a),
      ...createConfigSlice(...a),
      ...createHistorySlice(...a),
      ...createAnimationSlice(...a),
      ...createCameraSlice(...a),
      ...createUISlice(...a),
      ...createScrollSlice(...a),
    }),
    { name: 'kitchen-store' }
  )
);
