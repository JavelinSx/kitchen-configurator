// src/components/ui/ModuleList/TypeSelector.tsx
import React from 'react';
import { LayoutGrid, Square, LineHeight, Components } from 'lucide-react';
import { Badge } from '@/components/ui/common';
import type { ModuleType } from '@/types';

interface ModuleTypeInfo {
  id: ModuleType;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const moduleTypes: ModuleTypeInfo[] = [
  {
    id: 'cabinet',
    name: 'Шкафы',
    icon: LayoutGrid,
    description: 'Напольные и навесные шкафы',
  },
  {
    id: 'drawer',
    name: 'Ящики',
    icon: Square,
    description: 'Выдвижные ящики разных размеров',
  },
  {
    id: 'countertop',
    name: 'Столешницы',
    icon: LineHeight,
    description: 'Столешницы и рабочие поверхности',
  },
  {
    id: 'appliance',
    name: 'Техника',
    icon: Components,
    description: 'Встраиваемая техника',
  },
];

interface TypeSelectorProps {
  selectedType: ModuleType | null;
  onTypeSelect: (type: ModuleType) => void;
  moduleCountByType: Record<ModuleType, number>;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onTypeSelect, moduleCountByType }) => {
  return (
    <div className='space-y-2'>
      {moduleTypes.map((type) => {
        const Icon = type.icon;
        const count = moduleCountByType[type.id] || 0;
        const isSelected = selectedType === type.id;

        return (
          <button
            key={type.id}
            onClick={() => onTypeSelect(type.id)}
            className={`
              w-full p-3 rounded-lg text-left transition-all
              flex items-center gap-3
              ${isSelected ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : 'hover:bg-gray-50'}
            `}
          >
            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <span className='font-medium'>{type.name}</span>
                <Badge variant={isSelected ? 'success' : 'default'} className='ml-2'>
                  {count}
                </Badge>
              </div>
              <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>{type.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
