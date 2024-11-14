// src/hooks/useHistory.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useHistory = () => {
  const history = useKitchenStore((state) => state.history);
  const undoStack = useKitchenStore((state) => state.undoStack);
  const lastUpdate = useKitchenStore((state) => state.lastUpdate);
  const undo = useKitchenStore((state) => state.undo);
  const redo = useKitchenStore((state) => state.redo);
  const reset = useKitchenStore((state) => state.reset);
  const addHistoryEvent = useKitchenStore((state) => state.addHistoryEvent);

  return {
    history,
    undoStack,
    lastUpdate,
    undo,
    redo,
    reset,
    addHistoryEvent,
    canUndo: history.length > 0,
    canRedo: undoStack.length > 0,
  };
};
