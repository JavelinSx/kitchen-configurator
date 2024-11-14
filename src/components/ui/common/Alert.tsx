// src/components/ui/common/Alert.tsx
import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className={`p-4 rounded-lg border ${styles[type]}`}>
      <div className='flex items-start'>
        <Icon className='w-5 h-5 mt-0.5 flex-shrink-0' />
        <div className='ml-3 flex-1'>
          <h3 className='text-sm font-medium'>{title}</h3>
          <p className='mt-1 text-sm'>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className='ml-auto'>
            <XCircle className='w-5 h-5' />
          </button>
        )}
      </div>
    </div>
  );
};
