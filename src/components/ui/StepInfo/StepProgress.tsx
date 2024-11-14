// src/components/ui/StepInfo/StepProgress.tsx
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/common';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
}

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps, completedSteps }) => {
  const progress = (completedSteps.length / totalSteps) * 100;

  return (
    <div className='relative'>
      {/* Основной прогресс бар */}
      <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
        <div className='h-full bg-blue-500 transition-all duration-500 ease-out' style={{ width: `${progress}%` }} />
      </div>

      {/* Точки шагов */}
      <div className='absolute -top-1 left-0 w-full flex justify-between'>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;
          let bgColor = 'bg-gray-200';
          if (isCompleted) bgColor = 'bg-blue-500';
          if (isCurrent) bgColor = 'bg-blue-600';

          return (
            <div
              key={index}
              className={`
                w-4 h-4 rounded-full ${bgColor}
                flex items-center justify-center
                transition-all duration-300
                ${isCurrent ? 'ring-4 ring-blue-100' : ''}
              `}
            >
              {isCompleted && <Check className='w-3 h-3 text-white' />}
            </div>
          );
        })}
      </div>

      {/* Метки прогресса */}
      <div className='mt-6 flex justify-between text-sm'>
        <span className='text-blue-600 font-medium'>
          Шаг {currentStep + 1} из {totalSteps}
        </span>
        <Badge variant='success'>{Math.round(progress)}% готово</Badge>
      </div>
    </div>
  );
};
