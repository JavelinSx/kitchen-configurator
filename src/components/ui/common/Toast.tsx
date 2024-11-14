// src/components/ui/common/Toast.tsx
import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <div className='bg-white rounded-lg shadow-lg px-4 py-3 flex items-center'>
        {type === 'success' && <CheckCircle className='w-5 h-5 text-green-500 mr-2' />}
        {type === 'error' && <XCircle className='w-5 h-5 text-red-500 mr-2' />}
        {type === 'info' && <Info className='w-5 h-5 text-blue-500 mr-2' />}
        <p className='text-sm text-gray-700'>{message}</p>
      </div>
    </div>
  );
};
