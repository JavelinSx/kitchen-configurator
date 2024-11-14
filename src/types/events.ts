// src/types/events.ts
import { Material } from './materials';
import { KitchenModule } from './modules';

export type ConfiguratorEvent =
  | { type: 'MATERIAL_SELECTED'; moduleId: string; slotId: string; material: Material }
  | { type: 'MODULE_ADDED'; module: KitchenModule }
  | { type: 'MODULE_REMOVED'; moduleId: string }
  | { type: 'STEP_CHANGED'; stepId: number }
  | { type: 'ANIMATION_COMPLETED'; moduleId: string };

export interface HistoryState {
  history: ConfiguratorEvent[];
  undoStack: ConfiguratorEvent[];
  lastUpdate: Date;
}

export interface HistoryActions {
  undo: () => void;
  redo: () => void;
  reset: () => void;
  addHistoryEvent: (event: ConfiguratorEvent) => void;
}

export type HistorySlice = HistoryState & HistoryActions;
