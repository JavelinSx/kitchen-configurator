// src/components/ui/ModuleList/ModuleCard.tsx
import React from 'react';
import { Move, ChevronRight } from 'lucide-react';
import { Card, Badge } from '@/components/ui/common';
import type { KitchenModule } from '@/types';

interface ModuleCardProps {
  module: KitchenModule;
  onSelect: (module: KitchenModule) => void;
  isSelected?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onSelect, isSelected = false }) => {
  const formatDimensions = (dimensions: { width: number; height: number; depth: number }) => {
    return `${dimensions.width}×${dimensions.height}×${dimensions.depth} см`;
  };

  const getModuleTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      cabinet: 'Шкаф',
      drawer: 'Ящик',
      countertop: 'Столешница',
      appliance: 'Техника',
    };
    return types[type] || type;
  };

  return (
    <Card
      className={`
        relative transition-all cursor-pointer
        ${isSelected ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}
      `}
      onClick={() => onSelect(module)}
    >
      <div className='flex items-start gap-4 p-4'>
        {/* Превью модуля */}
        <div className='w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0'>
          <Move className='w-8 h-8 text-gray-400' />
        </div>

        {/* Информация о модуле */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-start justify-between gap-2'>
            <div>
              <h3 className='font-medium truncate'>{module.name}</h3>
              <div className='flex items-center gap-2 mt-1 flex-wrap'>
                <Badge variant='default'>{getModuleTypeLabel(module.type)}</Badge>
                <Badge variant='default'>{formatDimensions(module.dimensions)}</Badge>
              </div>
            </div>
            <ChevronRight
              className={`
              w-5 h-5 flex-shrink-0 transition-colors
              ${isSelected ? 'text-blue-500' : 'text-gray-400'}
            `}
            />
          </div>

          {/* Характеристики */}
          <div className='mt-3 space-y-1'>
            {module.type === 'cabinet' && (
              <>
                <p className='text-sm text-gray-600'>
                  Тип дверей: {module.doorStyle === 'hinged' ? 'Распашные' : 'Раздвижные'}
                </p>
                <p className='text-sm text-gray-600'>Количество полок: {module.shelves}</p>
              </>
            )}
            {module.type === 'drawer' && (
              <>
                <p className='text-sm text-gray-600'>
                  Тип направляющих: {module.railType === 'standard' ? 'Стандартные' : 'С доводчиками'}
                </p>
                <p className='text-sm text-gray-600'>Глубина: {module.depth === 'full' ? 'Полная' : 'Частичная'}</p>
              </>
            )}
            {module.type === 'countertop' && (
              <>
                <p className='text-sm text-gray-600'>
                  Кромка:{' '}
                  {module.edgeStyle === 'straight'
                    ? 'Прямая'
                    : module.edgeStyle === 'beveled'
                    ? 'Скошенная'
                    : 'Закругленная'}
                </p>
                <p className='text-sm text-gray-600'>Фартук: {module.backsplash ? 'Включен' : 'Отсутствует'}</p>
              </>
            )}
          </div>

          {/* Цена */}
          <div className='mt-3 text-right'>
            <span className='font-medium'>{module.price.toLocaleString()} ₽</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
