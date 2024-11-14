// src/components/ui/CameraControls/index.tsx
import React from 'react';
import {
  Camera,
  Maximize2, // вместо BorderAll
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowUp,
  ChevronsUpDown,
  ChevronsLeftRight,
  Move,
} from 'lucide-react';
import { ViewButton } from './ViewButton';
import { useCamera } from '@/hooks';
import type { Position } from '@/types';

const DEFAULT_VIEWS = {
  front: {
    position: { x: 0, y: 0, z: 5 },
    target: { x: 0, y: 0, z: 0 },
    zoom: 1,
  },
  top: {
    position: { x: 0, y: 5, z: 0 },
    target: { x: 0, y: 0, z: 0 },
    zoom: 1,
  },
  isometric: {
    position: { x: 5, y: 5, z: 5 },
    target: { x: 0, y: 0, z: 0 },
    zoom: 1,
  },
} as const;

export const CameraControls = () => {
  const { position, zoom, setCameraPosition, setCameraTarget, setZoom } = useCamera();
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPosition, setStartPosition] = React.useState<Position | null>(null);

  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY, z: 0 });
  };

  const handleDrag = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !startPosition) return;

      const deltaX = (e.clientX - startPosition.x) * 0.01;
      const deltaY = (e.clientY - startPosition.y) * 0.01;

      setCameraPosition({
        x: position.x * Math.cos(deltaX) - position.z * Math.sin(deltaX),
        y: position.y + deltaY,
        z: position.x * Math.sin(deltaX) + position.z * Math.cos(deltaX),
      });

      setStartPosition({ x: e.clientX, y: e.clientY, z: 0 });
    },
    [isDragging, startPosition, position, setCameraPosition]
  );

  const handleDragEnd = () => {
    setIsDragging(false);
    setStartPosition(null);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDrag]);

  const handleZoom = (delta: number) => {
    setZoom(Math.max(0.5, Math.min(2, zoom + delta)));
  };

  const handleReset = () => {
    setCameraPosition(DEFAULT_VIEWS.isometric.position);
    setCameraTarget(DEFAULT_VIEWS.isometric.target);
    setZoom(DEFAULT_VIEWS.isometric.zoom);
  };

  return (
    <div className='fixed right-8 bottom-8 flex flex-col gap-2'>
      {/* Предустановленные виды */}
      <div className='space-y-2'>
        <ViewButton
          icon={<Move />}
          tooltip='Вид спереди'
          position={DEFAULT_VIEWS.front.position}
          target={DEFAULT_VIEWS.front.target}
          zoom={DEFAULT_VIEWS.front.zoom}
        />
        <ViewButton
          icon={<ArrowUp />}
          tooltip='Вид сверху'
          position={DEFAULT_VIEWS.top.position}
          target={DEFAULT_VIEWS.top.target}
          zoom={DEFAULT_VIEWS.top.zoom}
        />
        <ViewButton
          icon={<Camera />}
          tooltip='Изометрический вид'
          position={DEFAULT_VIEWS.isometric.position}
          target={DEFAULT_VIEWS.isometric.target}
          zoom={DEFAULT_VIEWS.isometric.zoom}
        />
      </div>

      {/* Разделитель */}
      <div className='h-px bg-gray-200' />

      {/* Управление масштабом */}
      <div className='space-y-2'>
        <ViewButton icon={<ZoomIn />} tooltip='Приблизить' position={position} onClick={() => handleZoom(0.1)} />
        <ViewButton icon={<ZoomOut />} tooltip='Отдалить' position={position} onClick={() => handleZoom(-0.1)} />
      </div>

      {/* Разделитель */}
      <div className='h-px bg-gray-200' />

      {/* Управление вращением */}
      <div
        className='p-2 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move'
        onMouseDown={handleDragStart}
      >
        <div className='grid grid-cols-3 gap-1'>
          <div className='col-span-3 flex justify-center'>
            <ChevronsUpDown className='w-5 h-5 text-gray-400' />
          </div>
          <div className='flex justify-center'>
            <ChevronsLeftRight className='w-5 h-5 text-gray-400' />
          </div>
          <div className='flex justify-center'>
            <Maximize2 className='w-5 h-5 text-gray-400' />
          </div>
          <div className='flex justify-center'>
            <ChevronsLeftRight className='w-5 h-5 text-gray-400' />
          </div>
        </div>
      </div>

      {/* Кнопка сброса */}
      <ViewButton
        icon={<RotateCcw />}
        tooltip='Сбросить вид'
        position={DEFAULT_VIEWS.isometric.position}
        target={DEFAULT_VIEWS.isometric.target}
        zoom={DEFAULT_VIEWS.isometric.zoom}
        onClick={handleReset}
      />
    </div>
  );
};
