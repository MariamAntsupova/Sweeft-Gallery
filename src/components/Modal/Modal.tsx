import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import fetchSingleImage from '../FetchData/SingleImageFetch';

interface ModalProps {
  modalPhoto: any;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalPhoto, closeModal }) => {
  const [singleImage, setSingleImage] = useState<any | null>(null);

  useEffect(() => {
    const fetchAndSetSingleImage = async () => {
      if (modalPhoto) {
        const image = await fetchSingleImage(modalPhoto.id);
        setSingleImage(image);
      }
    };

    fetchAndSetSingleImage();
  }, [modalPhoto]);

  return (
    <div className={styles.Modal} onClick={closeModal}>
        {singleImage ? (
          <>
            <img src={singleImage.urls.regular} alt={singleImage.id} />
            <div>
              <p>Likes: {singleImage.likes}</p>
              <p>Downloads: {singleImage.downloads}</p>
              <p>Views: {singleImage.views}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
};

export default Modal;