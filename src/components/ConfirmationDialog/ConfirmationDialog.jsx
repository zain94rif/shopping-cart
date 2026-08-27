import React, { useEffect, useRef } from 'react';
import './ConfirmationDialog.css';

export const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}) => {
  const dialogRef = useRef(null);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Autofocus confirm button
      if (dialogRef.current) {
        const confirmBtn = dialogRef.current.querySelector('.dialog-btn-confirm');
        if (confirmBtn) confirmBtn.focus();
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={onCancel}>
      <div 
        className="dialog-box" 
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h3 id="dialog-title" className="dialog-title">{title}</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button 
            className="dialog-btn dialog-btn-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className="dialog-btn dialog-btn-confirm" 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
