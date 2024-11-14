// src/components/ui/CameraControls/ViewButton.tsx
import React from 'react';
import { Button } from '@/components/ui/common';
import { Tooltip } from '@/components/ui/common';
import { useCamera } from '@/hooks';
import type { Position } from '@/types';

interface ViewButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  position: Position;
  target?: Position;
  zoom?: number;
  onClick?: () => void;
}

export const ViewButton: React.FC<ViewButtonProps> = ({
  icon,
  tooltip,
  position,
  target = { x: 0, y: 0, z: 0 },
  zoom = 1,
  onClick,
}) => {
  const { setCameraPosition, setCameraTarget, setZoom } = useCamera();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    setCameraPosition(position);
    setCameraTarget(target);
    setZoom(zoom);
  };

  return (
    <Tooltip content={tooltip} position='left'>
      <Button variant='outline' size='sm' className='w-10 h-10 p-2 rounded-lg' onClick={handleClick}>
        {icon}
      </Button>
    </Tooltip>
  );
};
