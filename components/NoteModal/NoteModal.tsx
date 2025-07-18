
import { createPortal } from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';
import { useEffect } from 'react';


interface NoteModalProps {
  onClose: () => void;
}

const NoteModal = ({ onClose }: NoteModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={onClose} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;