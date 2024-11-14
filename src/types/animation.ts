// src/types/animation.ts
import { Position } from './common';

export interface ModuleAnimation {
  moduleId: string;
  startPosition: Position;
  endPosition: Position;
  duration: number;
  easing: string;
  delay?: number;
}

export interface AnimationState {
  activeAnimations: Map<string, ModuleAnimation>;
  isAnimating: boolean;
  pausedAnimations: Map<string, ModuleAnimation>;
}

export interface AnimationActions {
  startAnimation: (animation: ModuleAnimation) => void;
  pauseAnimation: (moduleId: string) => void;
  resumeAnimation: (moduleId: string) => void;
  stopAnimation: (moduleId: string) => void;
  updateAnimationProgress: (moduleId: string, progress: number) => void;
}

export type AnimationSlice = AnimationState & AnimationActions;
