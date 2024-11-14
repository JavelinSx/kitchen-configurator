// src/store/utils/storeUtils.ts
import { Material, KitchenModule, Position, ModuleAnimation } from '@/types';

export const calculateModulePosition = (module: KitchenModule, adjacentModules: KitchenModule[]): Position => {
  // Расчёт позиции модуля относительно соседних модулей
  const position = { x: 0, y: 0, z: 0 };

  adjacentModules.forEach((adjacentModule) => {
    // Проверяем коллизии и корректируем позицию
    if (checkCollision(module, adjacentModule)) {
      position.x += adjacentModule.dimensions.width;
    }
  });

  return position;
};

export const checkCollision = (module1: KitchenModule, module2: KitchenModule): boolean => {
  // Простая проверка пересечения boundingBox'ов
  return !(
    module1.position.x + module1.dimensions.width < module2.position.x ||
    module1.position.x > module2.position.x + module2.dimensions.width ||
    module1.position.y + module1.dimensions.height < module2.position.y ||
    module1.position.y > module2.position.y + module2.dimensions.height ||
    module1.position.z + module1.dimensions.depth < module2.position.z ||
    module1.position.z > module2.position.z + module2.dimensions.depth
  );
};

export const createModuleAnimation = (
  moduleId: string,
  startPosition: Position,
  endPosition: Position,
  duration: number = 1,
  easing: string = 'power2.out'
): ModuleAnimation => {
  return {
    moduleId,
    startPosition,
    endPosition,
    duration,
    easing,
  };
};

export const calculateTotalPrice = (
  modules: Map<string, KitchenModule>,
  materials: Map<string, Map<string, Material>>
): number => {
  let total = 0;

  // Суммируем стоимость модулей
  modules.forEach((module) => {
    total += module.price;
  });

  // Суммируем стоимость материалов
  materials.forEach((moduleMaterials) => {
    moduleMaterials.forEach((material) => {
      total += material.price;
    });
  });

  return total;
};

export const validateMaterialCompatibility = (module: KitchenModule, slotId: string, material: Material): boolean => {
  const slot = module.materialSlots[slotId];
  if (!slot) return false;

  return slot.compatibleMaterialTypes.includes(material.type);
};

export const generateModuleId = (): string => {
  return `module-${Math.random().toString(36).substr(2, 9)}`;
};
