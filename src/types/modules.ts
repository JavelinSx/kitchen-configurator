// src/types/modules.ts
import { Position, Dimensions } from './common';
import { Material } from './materials';

export type ModuleType = 'cabinet' | 'drawer' | 'countertop' | 'handle' | 'shelf' | 'appliance';

export interface ModuleBase {
  id: string;
  name: string;
  type: ModuleType;
  dimensions: Dimensions;
  position: Position;
  price: number;
  materialSlots: {
    [key: string]: {
      currentMaterial: Material | null;
      compatibleMaterialTypes: ('texture' | 'color')[];
    };
  };
}

export interface CabinetModule extends ModuleBase {
  type: 'cabinet';
  doorStyle: 'hinged' | 'sliding';
  shelves: number;
}

export interface DrawerModule extends ModuleBase {
  type: 'drawer';
  railType: 'standard' | 'soft-close';
  depth: 'full' | 'partial';
}

export interface CountertopModule extends ModuleBase {
  type: 'countertop';
  edgeStyle: 'straight' | 'beveled' | 'rounded';
  backsplash: boolean;
}

export type KitchenModule = CabinetModule | DrawerModule | CountertopModule;

export interface ModulesState {
  selectedModules: Map<string, KitchenModule>;
  totalPrice: number;
}

export interface ModulesActions {
  addModule: (module: KitchenModule) => void;
  removeModule: (moduleId: string) => void;
}

export type ModulesSlice = ModulesState & ModulesActions;
