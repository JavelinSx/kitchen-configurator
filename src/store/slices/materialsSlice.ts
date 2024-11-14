// src/store/slices/materialsSlice.ts
import { StateCreator } from 'zustand';
import type { Material, MaterialsSlice, KitchenStore } from '@/types';

export const createMaterialsSlice: StateCreator<
  KitchenStore, // полный тип стора
  [], // middleware types (пустой массив, если не используются)
  [], // injected types (пустой массив, если не используются)
  MaterialsSlice // тип, который возвращает этот slice
> = (set, get) => ({
  selectedMaterials: new Map(),

  setMaterial: (moduleId: string, slotId: string, material: Material) => {
    set((state) => {
      const moduleMaterials = state.selectedMaterials.get(moduleId) || new Map();
      const newMaterials = new Map(state.selectedMaterials);

      moduleMaterials.set(slotId, material);
      newMaterials.set(moduleId, moduleMaterials);

      return {
        selectedMaterials: newMaterials,
      };
    });

    // Добавляем событие в историю
    const historyEvent = {
      type: 'MATERIAL_SELECTED' as const,
      moduleId,
      slotId,
      material,
    };

    get().addHistoryEvent(historyEvent);
  },
});
