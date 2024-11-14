// src/components/ui/StepInfo/index.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Info, AlertCircle } from 'lucide-react';
import { Button, Badge, Card, Tooltip } from '@/components/ui/common';
import { StepProgress } from './StepProgress';
import { useConfig } from '@/hooks';
import type { ConfigStep } from '@/types';

const steps: ConfigStep[] = [
  {
    id: 0,
    name: 'Планировка',
    description: 'Выберите базовую планировку кухни',
    requiredModules: ['cabinet'],
    tip: 'Начните с определения основных зон и размещения коммуникаций',
  },
  {
    id: 1,
    name: 'Модули',
    description: 'Добавьте необходимые шкафы и ящики',
    requiredModules: ['cabinet', 'drawer'],
    tip: 'Учитывайте эргономику при размещении модулей',
  },
  {
    id: 2,
    name: 'Столешница',
    description: 'Выберите материал и конфигурацию столешницы',
    requiredModules: ['countertop'],
    tip: 'Обратите внимание на стыки и их расположение',
  },
  {
    id: 3,
    name: 'Фасады',
    description: 'Настройте внешний вид фасадов',
    requiredModules: ['cabinet', 'drawer'],
    tip: 'Подбирайте фасады с учетом стиля помещения',
  },
  {
    id: 4,
    name: 'Фурнитура',
    description: 'Добавьте ручки и механизмы',
    requiredModules: ['handle'],
    tip: 'Выбирайте удобные ручки, соответствующие стилю фасадов',
  },
] as const;

export const StepInfo = () => {
  const { currentStep, setStep } = useConfig();
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  // Эффект для имитации заполнения шагов (в реальном приложении должна быть проверка выполнения условий)
  React.useEffect(() => {
    if (!completedSteps.includes(currentStep - 1) && currentStep > 0) {
      setCompletedSteps((prev) => [...prev, currentStep - 1]);
    }
  }, [currentStep, completedSteps]);

  const currentStepInfo = steps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='fixed left-8 top-8 w-80 space-y-4'
    >
      {/* Прогресс */}
      <Card className='p-4'>
        <StepProgress currentStep={currentStep} totalSteps={steps.length} completedSteps={completedSteps} />
      </Card>

      {/* Текущий шаг */}
      <Card className='p-4'>
        <div className='space-y-4'>
          {/* Заголовок шага */}
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-medium'>{currentStepInfo.name}</h2>
            <Tooltip content='Подробная информация'>
              <Button variant='outline' size='sm' className='p-1.5'>
                <Info className='w-4 h-4 text-gray-500' />
              </Button>
            </Tooltip>
          </div>

          {/* Описание шага */}
          <p className='text-gray-600 text-sm'>{currentStepInfo.description}</p>

          {/* Подсказка */}
          <div className='flex items-start gap-3 p-3 bg-blue-50 rounded-md'>
            <AlertCircle className='w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5' />
            <p className='text-sm text-blue-700'>{currentStepInfo.tip}</p>
          </div>

          {/* Требуемые модули */}
          <div>
            <p className='text-sm text-gray-500 mb-2'>Требуемые модули:</p>
            <div className='flex flex-wrap gap-2'>
              {currentStepInfo.requiredModules.map((module) => (
                <Badge key={module} variant='default' className='capitalize'>
                  {module === 'cabinet'
                    ? 'Шкафы'
                    : module === 'drawer'
                    ? 'Ящики'
                    : module === 'countertop'
                    ? 'Столешница'
                    : module === 'handle'
                    ? 'Ручки'
                    : module}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Навигация по шагам */}
      <Card className='p-4'>
        <div className='space-y-2'>
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setStep(index)}
              className={`
                w-full flex items-center p-2 rounded-md text-left text-sm
                transition-colors
                ${currentStep === index ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
                ${index < currentStep ? 'text-gray-400' : 'text-gray-700'}
              `}
            >
              <span
                className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3
                  ${currentStep === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}
                `}
              >
                {index + 1}
              </span>
              {step.name}
              <ChevronRight
                className={`
                  w-4 h-4 ml-auto
                  ${currentStep === index ? 'text-blue-500' : 'text-gray-400'}
                `}
              />
            </button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
