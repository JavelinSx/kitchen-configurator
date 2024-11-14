// src/types/ui.ts
export interface UIState {
  activeModal: string | null;
  tooltips: Map<string, boolean>;
  isLoading: boolean;
}

export interface UIActions {
  setActiveModal: (modalId: string | null) => void;
  setTooltip: (tooltipId: string, isVisible: boolean) => void;
  setLoading: (isLoading: boolean) => void;
}

export type UISlice = UIState & UIActions;
