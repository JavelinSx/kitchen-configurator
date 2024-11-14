// src/hooks/useMaterials.ts
import { useKitchenStore } from '@/store/kitchenStore';
import type { Material } from '@/types';

export const useMaterials = () => {
  const selectedMaterials = useKitchenStore((state) => state.selectedMaterials);
  const setMaterial = useKitchenStore((state) => state.setMaterial);

  const getMaterialForModule = (moduleId: string, slotId: string): Material | undefined => {
    const moduleMaterials = selectedMaterials.get(moduleId);
    return moduleMaterials?.get(slotId);
  };

  const getModuleMaterials = (moduleId: string): Map<string, Material> | undefined => {
    return selectedMaterials.get(moduleId);
  };

  return {
    selectedMaterials,
    setMaterial,
    getMaterialForModule,
    getModuleMaterials,
  };
};
