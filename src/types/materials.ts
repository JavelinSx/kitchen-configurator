// src/types/materials.ts

export interface MaterialBase {
  id: string;
  name: string;
  price: number;
  availability: boolean;
}

export interface TextureMaterial extends MaterialBase {
  type: 'texture';
  textureUrl: string;
  normalMapUrl?: string;
  roughnessMapUrl?: string;
  repeatX?: number;
  repeatY?: number;
}

export interface ColorMaterial extends MaterialBase {
  type: 'color';
  color: string;
  metalness: number;
  roughness: number;
  glossiness?: number;
}

export type Material = TextureMaterial | ColorMaterial;

export interface MaterialsState {
  selectedMaterials: Map<string, Map<string, Material>>;
}

export interface MaterialsActions {
  setMaterial: (moduleId: string, slotId: string, material: Material) => void;
}

export type MaterialsSlice = MaterialsState & MaterialsActions;
