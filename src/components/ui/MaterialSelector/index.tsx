// src/components/ui/MaterialSelector/index.tsx
'use client';
import React from 'react';
import { Search, X } from 'lucide-react';
import { CategorySelector } from './CategorySelector';
import { MaterialCard } from './MaterialCard';
import { useMaterials } from '@/hooks';
import type { Material } from '@/types';

export const MaterialSelector = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('facades');
  const [selectedMaterialId, setSelectedMaterialId] = React.useState<string | null>(null);

  const { setMaterial } = useMaterials();

  const materials = React.useMemo<Material[]>(
    () => [
      {
        id: 'mat1',
        name: 'Белый глянец',
        type: 'color' as const,
        color: '#FFFFFF',
        price: 5000,
        availability: true,
        metalness: 0.9,
        roughness: 0.1,
        glossiness: 0.9,
      },
      {
        id: 'mat2',
        name: 'Дуб натуральный',
        type: 'texture' as const,
        textureUrl: '/textures/oak.jpg',
        price: 7500,
        availability: true,
        repeatX: 1,
        repeatY: 1,
      },
    ],
    []
  );

  const filteredMaterials = React.useMemo(() => {
    return materials.filter((material) => material.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [materials, searchQuery]);

  const handleMaterialSelect = (material: Material) => {
    setMaterial('demo-module', 'front', material);
    setSelectedMaterialId(material.id);
  };

  return (
    <div className='fixed right-8 top-8 w-80 bg-white rounded-lg shadow-lg'>
      {/* Заголовок */}
      <div className='p-4 border-b border-gray-200'>
        <h2 className='text-lg font-medium'>Выбор материалов</h2>
      </div>

      {/* Поиск */}
      <div className='p-4 border-b border-gray-200'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Поиск материалов...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              <X className='w-4 h-4' />
            </button>
          )}
        </div>
      </div>

      {/* Категории */}
      <CategorySelector selectedCategory={selectedCategory} onCategorySelect={setSelectedCategory} />

      {/* Список материалов */}
      <div className='p-4 space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto'>
        {filteredMaterials.map((material) => (
          <MaterialCard
            key={material.id}
            material={material}
            isSelected={selectedMaterialId === material.id}
            onSelect={handleMaterialSelect}
          />
        ))}
      </div>
    </div>
  );
};
