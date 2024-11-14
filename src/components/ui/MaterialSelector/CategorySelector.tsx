// src/components/ui/MaterialSelector/CategorySelector.tsx
import React from 'react';
import { Button } from '@/components/ui/common';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const materialCategories = [
  { id: 'facades', name: 'Фасады' },
  { id: 'countertops', name: 'Столешницы' },
  { id: 'handles', name: 'Ручки' },
] as const;

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className='p-4 border-b border-gray-200'>
      <div className='flex gap-2 overflow-x-auto'>
        {materialCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'primary' : 'outline'}
            size='sm'
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
