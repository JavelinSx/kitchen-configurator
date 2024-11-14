// src/hooks/useAnimations.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useAnimations = () => {
  const activeAnimations = useKitchenStore((state) => state.activeAnimations);
  const isAnimating = useKitchenStore((state) => state.isAnimating);
  const pausedAnimations = useKitchenStore((state) => state.pausedAnimations);
  const startAnimation = useKitchenStore((state) => state.startAnimation);
  const pauseAnimation = useKitchenStore((state) => state.pauseAnimation);
  const resumeAnimation = useKitchenStore((state) => state.resumeAnimation);
  const stopAnimation = useKitchenStore((state) => state.stopAnimation);
  const updateAnimationProgress = useKitchenStore((state) => state.updateAnimationProgress);

  return {
    activeAnimations,
    isAnimating,
    pausedAnimations,
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    stopAnimation,
    updateAnimationProgress,
  };
};
