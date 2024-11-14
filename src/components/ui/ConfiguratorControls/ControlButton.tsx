// src/components/ui/ConfiguratorControls/ControlButton.tsx
import React from 'react';
import { Button } from '@/components/ui/common';
import { Tooltip } from '@/components/ui/common';

interface ControlButtonProps {
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  icon,
  label,
  tooltip,
  onClick,
  disabled = false,
  active = false,
}) => {
  return (
    <Tooltip content={tooltip}>
      <Button
        variant={active ? 'primary' : 'outline'}
        size='sm'
        onClick={onClick}
        disabled={disabled}
        className='flex items-center gap-2 min-w-[120px] justify-center'
      >
        {icon}
        <span className='text-sm'>{label}</span>
      </Button>
    </Tooltip>
  );
};
