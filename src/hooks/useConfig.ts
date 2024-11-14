// src/hooks/useConfig.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useConfig = () => {
  const currentStep = useKitchenStore((state) => state.currentStep);
  const isConfiguring = useKitchenStore((state) => state.isConfiguring);
  const setStep = useKitchenStore((state) => state.setStep);

  return {
    currentStep,
    isConfiguring,
    setStep,
  };
};
