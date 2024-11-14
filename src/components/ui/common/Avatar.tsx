// src/components/ui/common/Avatar.tsx
import React from 'react';
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = 'Avatar', size = 'md', text, className = '', onClick }) => {
  const [imageError, setImageError] = React.useState(false);

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const initials = text
    ? text
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  if (!src || imageError) {
    return (
      <div
        className={`
            inline-flex items-center justify-center
            rounded-full bg-gray-200 text-gray-600 font-medium
            ${sizes[size]}
            ${onClick ? 'cursor-pointer hover:bg-gray-300' : ''}
            ${className}
          `}
        onClick={onClick}
      >
        {initials || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
      className={`
          rounded-full object-cover
          ${sizes[size]}
          ${onClick ? 'cursor-pointer' : ''}
          ${className}
        `}
      onClick={onClick}
    />
  );
};
