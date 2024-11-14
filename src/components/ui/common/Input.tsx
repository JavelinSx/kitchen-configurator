// src/components/ui/common/Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = '',
  ...props
}) => {
  return (
    <div className='w-full'>
      {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
      <div className='relative'>
        {leftIcon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>{leftIcon}</div>
        )}
        <input
          className={`
              w-full rounded-lg border
              ${
                error
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              py-2 focus:outline-none focus:ring-2
              ${props.disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
              ${className}
            `}
          {...props}
        />
        {rightIcon && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center
                ${onRightIconClick ? 'cursor-pointer' : ''}`}
            onClick={onRightIconClick}
          >
            {rightIcon}
          </div>
        )}
      </div>
      {(error || hint) && <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>{error || hint}</p>}
    </div>
  );
};
