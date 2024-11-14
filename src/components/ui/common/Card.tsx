// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card = ({ children, className = '', onClick }: CardProps) => {
  return (
    <div
      className={`
          bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden
          ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
          ${className}
        `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
