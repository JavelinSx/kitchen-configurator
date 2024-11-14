// src/store/utils/eventHandlers.ts
import { ConfiguratorEvent, StoreState, Material, KitchenModule } from '@/types';

interface UndoResult {
  selectedMaterials?: Map<string, Map<string, Material>>;
  selectedModules?: Map<string, KitchenModule>;
  totalPrice?: number;
}

export const handleUndoEvent = (event: ConfiguratorEvent, state: StoreState): UndoResult => {
  switch (event.type) {
    case 'MATERIAL_SELECTED': {
      const { moduleId, slotId } = event;
      const newMaterials = new Map(state.selectedMaterials);
      const moduleMaterials = newMaterials.get(moduleId);

      if (moduleMaterials) {
        moduleMaterials.delete(slotId);
        if (moduleMaterials.size === 0) {
          newMaterials.delete(moduleId);
        } else {
          newMaterials.set(moduleId, moduleMaterials);
        }
      }

      return { selectedMaterials: newMaterials };
    }

    case 'MODULE_ADDED': {
      const { module } = event;
      const newModules = new Map(state.selectedModules);
      newModules.delete(module.id);

      return {
        selectedModules: newModules,
        totalPrice: state.totalPrice - module.price,
      };
    }

    case 'MODULE_REMOVED': {
      const { moduleId } = event;
      const newModules = new Map(state.selectedModules);
      const removedModule = state.history.find((h) => h.type === 'MODULE_ADDED' && h.module.id === moduleId);

      if (removedModule && 'module' in removedModule) {
        newModules.set(moduleId, removedModule.module);
        return {
          selectedModules: newModules,
          totalPrice: state.totalPrice + removedModule.module.price,
        };
      }
      return {};
    }

    case 'STEP_CHANGED':
      // Для шага не нужно специальной логики отмены,
      // так как новое состояние уже содержит предыдущий шаг
      return {};

    default:
      return {};
  }
};

export const handleRedoEvent = (event: ConfiguratorEvent, state: StoreState): UndoResult => {
  switch (event.type) {
    case 'MATERIAL_SELECTED': {
      const { moduleId, slotId, material } = event;
      const newMaterials = new Map(state.selectedMaterials);
      let moduleMaterials = newMaterials.get(moduleId);

      if (!moduleMaterials) {
        moduleMaterials = new Map();
        newMaterials.set(moduleId, moduleMaterials);
      }

      moduleMaterials.set(slotId, material);
      return { selectedMaterials: newMaterials };
    }

    case 'MODULE_ADDED': {
      const { module } = event;
      const newModules = new Map(state.selectedModules);
      newModules.set(module.id, module);

      return {
        selectedModules: newModules,
        totalPrice: state.totalPrice + module.price,
      };
    }

    case 'MODULE_REMOVED': {
      const { moduleId } = event;
      const newModules = new Map(state.selectedModules);
      const moduleToRemove = newModules.get(moduleId);

      if (moduleToRemove) {
        newModules.delete(moduleId);
        return {
          selectedModules: newModules,
          totalPrice: state.totalPrice - moduleToRemove.price,
        };
      }
      return {};
    }

    default:
      return {};
  }
};
