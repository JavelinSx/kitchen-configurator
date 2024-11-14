// Modal Component
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, title, children, className = '' }: ModalProps) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black z-40'
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`
                fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-full max-w-lg bg-white rounded-lg shadow-xl z-50
                ${className}
              `}
          >
            {title && (
              <div className='px-6 py-4 border-b border-gray-200'>
                <h3 className='text-lg font-medium'>{title}</h3>
              </div>
            )}
            <div className='p-6'>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
