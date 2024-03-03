import React, { useEffect,useState } from 'react'
import styles from './Home.module.css';
import Modal from '../../Modal/Modal';
import fetchData from '../../FetchData/FetchData';
import SearchInput from '../../SearchInput/SearchInput';
import { Photo } from '../../PhotoTypes/PhotoTypes';

const HomePage:React.FC<{}> = () => {

  const [images, setImages] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>('popular');
  const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      let fetchedImages;
      if (searchValue.trim() !== '') {
        fetchedImages = await fetchData(searchValue);
        setImages(fetchedImages);
      } else {
        fetchedImages = await fetchData('popular');
      }
      setImages(fetchedImages);
    };

    fetchImages();
  }, [searchValue]);

  const handleInputSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleImageClick = async (image: Photo) => {
    try {
      setModalPhoto(image);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setModalPhoto(null);
  };


  return (
    <div className={styles.container}>
        <SearchInput onSearch={handleInputSearch} />
        <div className={styles.cartImages}>
          {images.map((image) => (
              <div key={image.id}>
                <img
                  className={styles.cartImage}
                  src={image.urls.regular}
                  alt={image.id}
                  onClick={() => handleImageClick(image)}
                />

              </div>
            ))}          
        </div>

        {modalPhoto && <Modal modalPhoto={modalPhoto} closeModal={closeModal} />}
    </div>
  )
}

export default HomePage