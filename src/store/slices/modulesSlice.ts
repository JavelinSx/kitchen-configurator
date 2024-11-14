// src/store/slices/modulesSlice.ts
import { StateCreator } from 'zustand';
import { KitchenModule, ConfiguratorEvent, StoreState } from '@/types';

export interface ModulesSlice {
  selectedModules: Map<string, KitchenModule>;
  totalPrice: number;
  addModule: (module: KitchenModule) => void;
  removeModule: (moduleId: string) => void;
}

export const createModulesSlice: StateCreator<StoreState, [], [], ModulesSlice> = (set) => ({
  selectedModules: new Map(),
  totalPrice: 0,
  addModule: (module) => {
    set((state) => {
      const newModules = new Map(state.selectedModules);
      newModules.set(module.id, module);

      return {
        selectedModules: newModules,
        totalPrice: state.totalPrice + module.price,
        history: [...state.history, { type: 'MODULE_ADDED', module } as ConfiguratorEvent],
        lastUpdate: new Date(),
      };
    });
  },
  removeModule: (moduleId) => {
    set((state) => {
      const newModules = new Map(state.selectedModules);
      const kitchenModule = newModules.get(moduleId);
      if (!kitchenModule) return state;

      newModules.delete(moduleId);

      return {
        selectedModules: newModules,
        totalPrice: state.totalPrice - kitchenModule.price,
        history: [...state.history, { type: 'MODULE_REMOVED', moduleId } as ConfiguratorEvent],
        lastUpdate: new Date(),
      };
    });
  },
});
