import React, { useEffect } from 'react';
import {
  ModalOverlay,
  ModalImage,
  CloseButton,
  NavigationButtonLeft,
  NavigationButtonRight,
} from './ImageModal.styles';

type ImageModalProps = {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
};

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  altText,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    e.stopPropagation();
  };

  const handleNavigationClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    callback: () => void,
  ): void => {
    e.stopPropagation();
    callback();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      $isOpen={isOpen}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image modal"
    >
      <CloseButton onClick={onClose} aria-label="Close modal">
        ✕
      </CloseButton>
      {hasPrevious && onPrevious && (
        <NavigationButtonLeft
          onClick={(e) => handleNavigationClick(e, onPrevious)}
          aria-label="Previous image"
        >
          ‹
        </NavigationButtonLeft>
      )}
      {hasNext && onNext && (
        <NavigationButtonRight
          onClick={(e) => handleNavigationClick(e, onNext)}
          aria-label="Next image"
        >
          ›
        </NavigationButtonRight>
      )}
      <ModalImage src={imageUrl} alt={altText} onClick={handleImageClick} />
    </ModalOverlay>
  );
};
