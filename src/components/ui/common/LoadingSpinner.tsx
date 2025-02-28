// src/components/ui/common/LoadingSpinner.tsx
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizes[size]}`} />;
};
