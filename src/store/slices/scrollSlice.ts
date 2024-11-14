// src/store/slices/scrollSlice.ts
import { StateCreator } from 'zustand';
import type { ScrollSlice, KitchenStore } from '@/types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const createScrollSlice: StateCreator<KitchenStore, [], [], ScrollSlice> = (set, get) => ({
  progress: 0,
  direction: 'down',
  currentSection: 'intro',

  setScrollProgress: (progress: number) => {
    const currentProgress = get().progress;
    const newDirection = progress > currentProgress ? 'down' : 'up';

    set({
      progress,
      direction: newDirection,
    });

    // Обновляем анимации на основе прогресса прокрутки
    const { activeAnimations, updateAnimationProgress } = get();
    activeAnimations.forEach((_, moduleId) => {
      updateAnimationProgress(moduleId, progress);
    });
  },

  setScrollDirection: (direction: 'up' | 'down') => {
    set({ direction });
  },

  setCurrentSection: (section: string) => {
    const previousSection = get().currentSection;

    if (previousSection !== section) {
      set({ currentSection: section });

      // Обновляем камеру в зависимости от секции
      const { setCameraPosition, setCameraTarget } = get();

      // Определяем позиции камеры для разных секций
      const cameraPositions: Record<
        string,
        { position: { x: number; y: number; z: number }; target: { x: number; y: number; z: number } }
      > = {
        intro: {
          position: { x: 5, y: 5, z: 5 },
          target: { x: 0, y: 0, z: 0 },
        },
        modules: {
          position: { x: 3, y: 4, z: 3 },
          target: { x: 0, y: 1, z: 0 },
        },
        materials: {
          position: { x: 2, y: 3, z: 4 },
          target: { x: 0, y: 0, z: 0 },
        },
        // Добавьте другие секции по необходимости
      };

      const sectionCamera = cameraPositions[section];
      if (sectionCamera) {
        setCameraPosition(sectionCamera.position);
        setCameraTarget(sectionCamera.target);
      }
    }
  },
});
