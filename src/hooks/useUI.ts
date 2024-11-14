// src/hooks/useUI.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useUI = () => {
  const activeModal = useKitchenStore((state) => state.activeModal);
  const tooltips = useKitchenStore((state) => state.tooltips);
  const isLoading = useKitchenStore((state) => state.isLoading);
  const setActiveModal = useKitchenStore((state) => state.setActiveModal);
  const setTooltip = useKitchenStore((state) => state.setTooltip);
  const setLoading = useKitchenStore((state) => state.setLoading);

  return {
    activeModal,
    tooltips,
    isLoading,
    setActiveModal,
    setTooltip,
    setLoading,
  };
};
