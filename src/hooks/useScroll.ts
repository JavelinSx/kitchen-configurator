// src/hooks/useScroll.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useScroll = () => {
  const progress = useKitchenStore((state) => state.progress);
  const direction = useKitchenStore((state) => state.direction);
  const currentSection = useKitchenStore((state) => state.currentSection);
  const setScrollProgress = useKitchenStore((state) => state.setScrollProgress);
  const setScrollDirection = useKitchenStore((state) => state.setScrollDirection);
  const setCurrentSection = useKitchenStore((state) => state.setCurrentSection);

  return {
    progress,
    direction,
    currentSection,
    setScrollProgress,
    setScrollDirection,
    setCurrentSection,
  };
};
