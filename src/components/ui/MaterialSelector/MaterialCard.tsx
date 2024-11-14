// src/components/ui/MaterialSelector/MaterialCard.tsx
import React from 'react';
import { Check } from 'lucide-react';
import { Tooltip, Card, Badge, Button } from '@/components/ui/common';
import type { Material } from '@/types';

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onSelect: (material: Material) => void;
}

const MaterialTooltipContent = ({ material }: { material: Material }) => (
  <div className='space-y-1'>
    <p>Характеристики:</p>
    {material.type === 'color' ? (
      <>
        <p>Металлик: {(material.metalness * 100).toFixed()}%</p>
        <p>Матовость: {(material.roughness * 100).toFixed()}%</p>
        {material.glossiness && <p>Глянец: {(material.glossiness * 100).toFixed()}%</p>}
      </>
    ) : (
      <>
        <p>Повтор X: {material.repeatX}</p>
        <p>Повтор Y: {material.repeatY}</p>
      </>
    )}
  </div>
);

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, isSelected, onSelect }) => {
  return (
    <Card
      className={`
        relative p-4 cursor-pointer transition-all
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={() => onSelect(material)}
    >
      <div className='flex items-start gap-4'>
        {/* Превью материала */}
        <div
          className='w-16 h-16 rounded-md border border-gray-200'
          style={{
            background: material.type === 'color' ? material.color : `url(${material.textureUrl}) center/cover`,
          }}
        />

        {/* Информация о материале */}
        <div className='flex-1'>
          <div className='flex items-start justify-between'>
            <div>
              <h3 className='font-medium'>{material.name}</h3>
              <p className='text-sm text-gray-500'>{material.type === 'color' ? 'Цвет' : 'Текстура'}</p>
            </div>
            <Badge variant={material.availability ? 'success' : 'error'}>
              {material.availability ? 'В наличии' : 'Нет в наличии'}
            </Badge>
          </div>

          <div className='mt-2 flex items-center justify-between'>
            <span className='font-medium'>{material.price.toLocaleString()} ₽</span>
            {isSelected && <Check className='w-5 h-5 text-blue-500' />}
          </div>
        </div>
      </div>

      <Tooltip content={<MaterialTooltipContent material={material} />} position='left'>
        <Button variant='outline' size='sm' className='absolute top-2 right-2'>
          i
        </Button>
      </Tooltip>
    </Card>
  );
};
