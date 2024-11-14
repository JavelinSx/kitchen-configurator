// src/store/slices/animationSlice.ts
import { StateCreator } from 'zustand';
import type { AnimationSlice, ModuleAnimation, KitchenStore } from '@/types';
import gsap from 'gsap';

export const createAnimationSlice: StateCreator<KitchenStore, [], [], AnimationSlice> = (set, get) => ({
  activeAnimations: new Map(),
  isAnimating: false,
  pausedAnimations: new Map(),

  startAnimation: (animation: ModuleAnimation) => {
    set((state) => {
      const newAnimations = new Map(state.activeAnimations);
      newAnimations.set(animation.moduleId, animation);

      gsap.to(`#module-${animation.moduleId}`, {
        x: animation.endPosition.x,
        y: animation.endPosition.y,
        z: animation.endPosition.z,
        duration: animation.duration,
        ease: animation.easing,
        delay: animation.delay || 0,
        onComplete: () => {
          get().stopAnimation(animation.moduleId);
          get().addHistoryEvent({
            type: 'ANIMATION_COMPLETED',
            moduleId: animation.moduleId,
          });
        },
      });

      return {
        activeAnimations: newAnimations,
        isAnimating: true,
      };
    });
  },

  pauseAnimation: (moduleId: string) => {
    set((state) => {
      const animation = state.activeAnimations.get(moduleId);
      if (!animation) return state;

      gsap.getTweensOf(`#module-${moduleId}`).forEach((tween) => tween.pause());

      const newActiveAnimations = new Map(state.activeAnimations);
      const newPausedAnimations = new Map(state.pausedAnimations);

      newActiveAnimations.delete(moduleId);
      newPausedAnimations.set(moduleId, animation);

      return {
        activeAnimations: newActiveAnimations,
        pausedAnimations: newPausedAnimations,
        isAnimating: newActiveAnimations.size > 0,
      };
    });
  },

  resumeAnimation: (moduleId: string) => {
    set((state) => {
      const animation = state.pausedAnimations.get(moduleId);
      if (!animation) return state;

      gsap.getTweensOf(`#module-${moduleId}`).forEach((tween) => tween.play());

      const newActiveAnimations = new Map(state.activeAnimations);
      const newPausedAnimations = new Map(state.pausedAnimations);

      newPausedAnimations.delete(moduleId);
      newActiveAnimations.set(moduleId, animation);

      return {
        activeAnimations: newActiveAnimations,
        pausedAnimations: newPausedAnimations,
        isAnimating: true,
      };
    });
  },

  stopAnimation: (moduleId: string) => {
    set((state) => {
      gsap.getTweensOf(`#module-${moduleId}`).forEach((tween) => tween.kill());

      const newActiveAnimations = new Map(state.activeAnimations);
      const newPausedAnimations = new Map(state.pausedAnimations);

      newActiveAnimations.delete(moduleId);
      newPausedAnimations.delete(moduleId);

      return {
        activeAnimations: newActiveAnimations,
        pausedAnimations: newPausedAnimations,
        isAnimating: newActiveAnimations.size > 0,
      };
    });
  },

  updateAnimationProgress: (moduleId: string, progress: number) => {
    const animation = get().activeAnimations.get(moduleId);
    if (!animation) return;

    gsap.getTweensOf(`#module-${moduleId}`).forEach((tween) => {
      tween.progress(progress);
    });
  },
});
