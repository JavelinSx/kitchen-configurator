// src/store/slices/cameraSlice.ts
import { StateCreator } from 'zustand';
import type { CameraSlice, Position, KitchenStore } from '@/types';
import gsap from 'gsap';

export const createCameraSlice: StateCreator<KitchenStore, [], [], CameraSlice> = (set) => ({
  position: { x: 5, y: 5, z: 5 }, // Начальная позиция камеры
  target: { x: 0, y: 0, z: 0 }, // Начальная точка, на которую смотрит камера
  zoom: 1,

  setCameraPosition: (position: Position) => {
    set((state) => {
      // Анимируем перемещение камеры
      gsap.to('#camera', {
        'position-x': position.x,
        'position-y': position.y,
        'position-z': position.z,
        duration: 1,
        ease: 'power2.inOut',
      });

      return { position };
    });
  },

  setCameraTarget: (target: Position) => {
    set((state) => {
      // Анимируем поворот камеры к новой цели
      gsap.to('#camera-target', {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1,
        ease: 'power2.inOut',
      });

      return { target };
    });
  },

  setZoom: (zoom: number) => {
    set((state) => {
      // Анимируем изменение зума
      gsap.to('#camera', {
        zoom,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      return { zoom };
    });
  },
});
