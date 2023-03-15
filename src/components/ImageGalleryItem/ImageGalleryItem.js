import { Modal } from 'components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { Img, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, tags, webformatURL, largeImageURL }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEsc);
    return window.removeEventListener('keydown', handleKeyEsc);
  }, [isOpen]);

  const handleImageZoom = () => {
    setIsOpen(true);
  };

  const handleKeyEsc = evt => {
    if (evt.code === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
      setIsOpen(false);
    }
  };

  return (
    <Item key={id}>
      <Img src={webformatURL} alt={tags} onClick={handleImageZoom} />
      {isOpen && (
        <Modal
          tags={tags}
          imgUrl={largeImageURL}
          onBackdropClick={handleBackdrop}
        />
      )}
    </Item>
  );
};
