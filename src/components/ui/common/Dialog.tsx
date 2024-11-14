// src/components/ui/common/Dialog.tsx
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen px-4'>
        <div className='fixed inset-0 bg-black/50' onClick={onClose} />
        <div className='relative bg-white rounded-lg max-w-lg w-full'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h3 className='text-lg font-medium'>{title}</h3>
          </div>
          <div className='px-6 py-4'>{children}</div>
          {actions && <div className='px-6 py-4 border-t border-gray-200 flex justify-end space-x-2'>{actions}</div>}
        </div>
      </div>
    </div>
  );
};
