// src/hooks/useCamera.ts
import { useKitchenStore } from '@/store/kitchenStore';

export const useCamera = () => {
  const position = useKitchenStore((state) => state.position);
  const target = useKitchenStore((state) => state.target);
  const zoom = useKitchenStore((state) => state.zoom);
  const setCameraPosition = useKitchenStore((state) => state.setCameraPosition);
  const setCameraTarget = useKitchenStore((state) => state.setCameraTarget);
  const setZoom = useKitchenStore((state) => state.setZoom);

  return {
    position,
    target,
    zoom,
    setCameraPosition,
    setCameraTarget,
    setZoom,
  };
};
