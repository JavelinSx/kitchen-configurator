// src/components/ui/common/Dropdown.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block w-full ${className}`}>
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full px-4 py-2 text-left bg-white border rounded-lg
          flex items-center justify-between
          ${disabled ? 'cursor-not-allowed bg-gray-50' : 'hover:bg-gray-50'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
        disabled={disabled}
      >
        <span className='flex items-center'>
          {selectedOption?.icon && <span className='mr-2'>{selectedOption.icon}</span>}
          <span className={!selectedOption ? 'text-gray-400' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto'>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-4 py-2 text-left flex items-center
                ${option.value === value ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}
              `}
            >
              {option.icon && <span className='mr-2'>{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
