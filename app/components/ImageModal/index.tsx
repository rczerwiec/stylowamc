import { useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: ImageModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Przycisk zamknięcia */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition-colors z-10"
        >
          <FaTimes size={24} />
        </button>

        {/* Przyciski nawigacji */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 text-white hover:text-yellow-400 transition-colors z-10"
          >
            <FaChevronLeft size={24} />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 text-white hover:text-yellow-400 transition-colors z-10"
          >
            <FaChevronRight size={24} />
          </button>
        )}

        {/* Kontener zdjęcia */}
        <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
          <Image
            src={imageUrl}
            alt="Powiększone zdjęcie"
            fill
            className="object-contain"
            quality={100}
            priority
          />
        </div>
      </div>
    </div>
  );
} 