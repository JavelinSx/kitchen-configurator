// src/components/ui/ModuleList/index.tsx
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/common';
import { TypeSelector, moduleTypes } from './TypeSelector';
import { ModuleCard } from './ModuleCard';
import { useModules } from '@/hooks';
import type { ModuleType, KitchenModule } from '@/types';

export const ModuleList = () => {
  const [selectedType, setSelectedType] = React.useState<ModuleType | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedModuleId, setSelectedModuleId] = React.useState<string | null>(null);

  const { selectedModules, addModule } = useModules();

  // Примерные данные модулей (в реальном приложении должны приходить с бэкенда)
  const modules = React.useMemo<KitchenModule[]>(
    () => [
      {
        id: 'cab1',
        name: 'Шкаф напольный 60см',
        type: 'cabinet',
        dimensions: { width: 60, height: 82, depth: 56 },
        position: { x: 0, y: 0, z: 0 },
        price: 8500,
        doorStyle: 'hinged',
        shelves: 2,
        materialSlots: {
          front: {
            currentMaterial: null,
            compatibleMaterialTypes: ['texture', 'color'],
          },
          body: {
            currentMaterial: null,
            compatibleMaterialTypes: ['texture'],
          },
        },
      },
      {
        id: 'drw1',
        name: 'Ящик 45см',
        type: 'drawer',
        dimensions: { width: 45, height: 82, depth: 56 },
        position: { x: 0, y: 0, z: 0 },
        price: 12000,
        railType: 'soft-close',
        depth: 'full',
        materialSlots: {
          front: {
            currentMaterial: null,
            compatibleMaterialTypes: ['texture', 'color'],
          },
          body: {
            currentMaterial: null,
            compatibleMaterialTypes: ['texture'],
          },
        },
      },
    ],
    []
  );

  const moduleCountByType = React.useMemo(() => {
    return modules.reduce((acc, module) => {
      acc[module.type] = (acc[module.type] || 0) + 1;
      return acc;
    }, {} as Record<ModuleType, number>);
  }, [modules]);

  const filteredModules = React.useMemo(() => {
    return modules.filter((module) => {
      const matchesType = !selectedType || module.type === selectedType;
      const matchesSearch = !searchQuery || module.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [modules, selectedType, searchQuery]);

  const handleModuleSelect = (module: KitchenModule) => {
    setSelectedModuleId(module.id);
    addModule(module);
  };

  return (
    <div className='fixed left-8 top-8 w-80 bg-white rounded-lg shadow-lg'>
      {/* Заголовок */}
      <div className='p-4 border-b border-gray-200'>
        <h2 className='text-lg font-medium'>Модули кухни</h2>
      </div>

      {/* Поиск */}
      <div className='p-4 border-b border-gray-200'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Поиск модулей...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <Button
            variant='outline'
            size='sm'
            className='absolute right-2 top-1/2 -translate-y-1/2 p-1'
            onClick={() => {
              /* Открыть фильтры */
            }}
          >
            <SlidersHorizontal className='w-4 h-4' />
          </Button>
        </div>
      </div>

      <div className='flex h-[calc(100vh-200px)]'>
        {/* Типы модулей */}
        <div className='w-1/3 p-4 border-r border-gray-200 overflow-y-auto'>
          <TypeSelector
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
            moduleCountByType={moduleCountByType}
          />
        </div>

        {/* Список модулей */}
        <div className='w-2/3 p-4 overflow-y-auto'>
          <div className='space-y-4'>
            {filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isSelected={selectedModuleId === module.id}
                onSelect={handleModuleSelect}
              />
            ))}
            {filteredModules.length === 0 && (
              <div className='text-center text-gray-500 py-8'>
                {searchQuery ? 'Не найдено модулей по вашему запросу' : 'Выберите тип модуля слева'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
