// src/types/scroll.ts
export interface ScrollState {
  progress: number;
  direction: 'up' | 'down';
  currentSection: string;
}

export interface ScrollActions {
  setScrollProgress: (progress: number) => void;
  setScrollDirection: (direction: 'up' | 'down') => void;
  setCurrentSection: (section: string) => void;
}

export type ScrollSlice = ScrollState & ScrollActions;
