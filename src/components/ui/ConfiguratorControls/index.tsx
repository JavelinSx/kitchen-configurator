// src/components/ui/ConfiguratorControls/index.tsx
import React from 'react';
import { Undo2, Redo2, Save, Share2, FileDown, Eye, EyeOff, Settings2 } from 'lucide-react';
import { ControlButton } from './ControlButton';
import { useHistory, useConfig, useUI } from '@/hooks';
import { Badge } from '@/components/ui/common';

export const ConfiguratorControls = () => {
  const { undo, redo, history, undoStack, canUndo, canRedo } = useHistory();
  const { currentStep, setStep } = useConfig();
  const { setActiveModal } = useUI();

  const [previewMode, setPreviewMode] = React.useState(false);

  // Сохраняем последнее изменение для отображения в бейдже
  const lastChange = React.useMemo(() => {
    if (history.length === 0) return null;
    const lastEvent = history[history.length - 1];

    switch (lastEvent.type) {
      case 'MATERIAL_SELECTED':
        return 'Выбран материал';
      case 'MODULE_ADDED':
        return 'Добавлен модуль';
      case 'MODULE_REMOVED':
        return 'Удален модуль';
      case 'STEP_CHANGED':
        return 'Изменен этап';
      default:
        return 'Изменение';
    }
  }, [history]);

  const handleSave = () => {
    setActiveModal('save-project');
  };

  const handleShare = () => {
    setActiveModal('share-project');
  };

  const handleExport = () => {
    setActiveModal('export-project');
  };

  const handleSettings = () => {
    setActiveModal('settings');
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className='fixed left-1/2 bottom-8 -translate-x-1/2 flex items-center gap-4 bg-white rounded-lg shadow-lg p-4'>
      {/* История изменений */}
      <div className='flex items-center gap-2'>
        <ControlButton
          icon={<Undo2 className='w-4 h-4' />}
          label='Отменить'
          tooltip={`Отменить${canUndo ? ': ' + lastChange : ''}`}
          onClick={undo}
          disabled={!canUndo}
        />
        <ControlButton
          icon={<Redo2 className='w-4 h-4' />}
          label='Вернуть'
          tooltip='Вернуть отмененное действие'
          onClick={redo}
          disabled={!canRedo}
        />
      </div>

      {/* Разделитель */}
      <div className='h-8 w-px bg-gray-200' />

      {/* Действия с проектом */}
      <div className='flex items-center gap-2'>
        <ControlButton
          icon={<Save className='w-4 h-4' />}
          label='Сохранить'
          tooltip='Сохранить проект'
          onClick={handleSave}
        />
        <ControlButton
          icon={<Share2 className='w-4 h-4' />}
          label='Поделиться'
          tooltip='Поделиться проектом'
          onClick={handleShare}
        />
        <ControlButton
          icon={<FileDown className='w-4 h-4' />}
          label='Экспорт'
          tooltip='Экспортировать проект'
          onClick={handleExport}
        />
      </div>

      {/* Разделитель */}
      <div className='h-8 w-px bg-gray-200' />

      {/* Режим просмотра и настройки */}
      <div className='flex items-center gap-2'>
        <ControlButton
          icon={previewMode ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
          label={previewMode ? 'Выключить' : 'Просмотр'}
          tooltip={previewMode ? 'Выключить режим просмотра' : 'Включить режим просмотра'}
          onClick={togglePreviewMode}
          active={previewMode}
        />
        <ControlButton
          icon={<Settings2 className='w-4 h-4' />}
          label='Настройки'
          tooltip='Открыть настройки'
          onClick={handleSettings}
        />
      </div>

      {/* Индикатор последнего изменения */}
      {lastChange && (
        <div className='absolute -top-8 left-1/2 -translate-x-1/2'>
          <Badge variant='default' className='animate-fade-in'>
            {lastChange}
          </Badge>
        </div>
      )}
    </div>
  );
};
