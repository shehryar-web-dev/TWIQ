import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  title?: string;
}

const Modal = ({ 
  children, 
  isOpen, 
  onClose, 
  size = 'md', 
  className = '',
  title
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the body while the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when the modal is closed
      document.body.style.overflow = "auto";
    }
    
    return () => {
      // Restore scrolling when the modal unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm w-full';
      case 'md':
        return 'max-w-md w-full';
      case 'lg':
        return 'max-w-lg w-full';
      case 'xl':
        return 'max-w-4xl w-full';
      case '2xl':
        return 'max-w-5xl w-full';
      default:
        return 'max-w-md w-full';
    }
  };

  if (!isOpen) return null;

  // Create a portal to render the modal at the root level
  return createPortal(
    <div className="modal-backdrop fixed inset-0 w-full h-screen bg-gray-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto z-50">
      <div className="w-full min-h-screen p-4 sm:p-6 flex justify-center items-center pt-16">
        <div className={`slide-down-big-in ${getSizeClasses()} mx-auto rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl dark:shadow-black/50 ${className}`}>
          {title && (
            <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
