// Tooltip Component
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positionStyles = {
    top: '-translate-x-1/2 -translate-y-full left-1/2 bottom-[calc(100%+5px)]',
    bottom: '-translate-x-1/2 translate-y-full left-1/2 top-[calc(100%+5px)]',
    left: '-translate-y-1/2 -translate-x-full top-1/2 right-[calc(100%+5px)]',
    right: '-translate-y-1/2 translate-x-full top-1/2 left-[calc(100%+5px)]',
  };

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`
                absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded
                whitespace-nowrap ${positionStyles[position]}
              `}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
