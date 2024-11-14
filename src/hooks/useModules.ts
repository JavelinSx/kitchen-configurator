// src/hooks/useModules.ts
import { useKitchenStore } from '@/store/kitchenStore';
import type { KitchenModule } from '@/types';

export const useModules = () => {
  const selectedModules = useKitchenStore((state) => state.selectedModules);
  const totalPrice = useKitchenStore((state) => state.totalPrice);
  const addModule = useKitchenStore((state) => state.addModule);
  const removeModule = useKitchenStore((state) => state.removeModule);

  const getModule = (moduleId: string): KitchenModule | undefined => {
    return selectedModules.get(moduleId);
  };

  const getModulesByType = (type: string): KitchenModule[] => {
    return Array.from(selectedModules.values()).filter((module) => module.type === type);
  };

  const getAdjacentModules = (moduleId: string): KitchenModule[] => {
    const currentModule = selectedModules.get(moduleId);
    if (!currentModule) return [];

    return Array.from(selectedModules.values()).filter((module) => {
      if (module.id === moduleId) return false;

      // Простая проверка на смежность по координатам
      const isAdjacent =
        Math.abs(module.position.x - currentModule.position.x) <= currentModule.dimensions.width ||
        Math.abs(module.position.z - currentModule.position.z) <= currentModule.dimensions.depth;

      return isAdjacent;
    });
  };

  return {
    selectedModules,
    totalPrice,
    addModule,
    removeModule,
    getModule,
    getModulesByType,
    getAdjacentModules,
  };
};
