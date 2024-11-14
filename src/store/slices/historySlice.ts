// src/store/slices/historySlice.ts
import { StateCreator } from 'zustand';
import { ConfiguratorEvent, StoreState } from '@/types';
import { handleUndoEvent, handleRedoEvent } from '../utils/eventHandlers';

// Исправляем типизацию для слайса
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

// Определяем начальное состояние истории
const initialHistoryState: HistoryState = {
  history: [],
  undoStack: [],
  lastUpdate: new Date(),
};

// Исправляем типизацию StateCreator
export const createHistorySlice: StateCreator<StoreState, [], [], HistorySlice> = (set) => ({
  // Начальное состояние
  ...initialHistoryState,

  // Действия
  addHistoryEvent: (event: ConfiguratorEvent) => {
    set((state: StoreState) => ({
      history: [...state.history, event],
      undoStack: [],
      lastUpdate: new Date(),
    }));
  },

  undo: () => {
    set((state: StoreState) => {
      const history = [...state.history];
      const lastEvent = history.pop();

      if (!lastEvent) return state;

      const undoStack = [...state.undoStack, lastEvent];
      const undoResult = handleUndoEvent(lastEvent, state);

      return {
        ...state,
        ...undoResult,
        history,
        undoStack,
        lastUpdate: new Date(),
      };
    });
  },

  redo: () => {
    set((state: StoreState) => {
      const undoStack = [...state.undoStack];
      const nextEvent = undoStack.pop();

      if (!nextEvent) return state;

      const redoResult = handleRedoEvent(nextEvent, state);

      return {
        ...state,
        ...redoResult,
        history: [...state.history, nextEvent],
        undoStack,
        lastUpdate: new Date(),
      };
    });
  },

  reset: () => {
    set((state: StoreState) => ({
      ...state,
      ...initialHistoryState,
    }));
  },
});

// Добавляем тип для использования внутри слайса
export type HistorySliceStore = StoreState & HistorySlice;
