import React, { useState, useEffect } from 'react';
import styles from './History.module.css';
import Modal from '../../Modal/Modal';
import fetchData from '../../FetchData/FetchData';
import { Photo } from '../../PhotoTypes/PhotoTypes';

const HistoryPage: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [modalPhoto, setModalPhoto] = useState<any | null>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const historyArray = storedHistory ? JSON.parse(storedHistory) : [];
    setSearchHistory(historyArray.slice(-30)); 
  }, []);

  const handleImageClick = async (item: string | Photo) => {
    try {
      if (typeof item === 'string') {
        const fetchedImages = await fetchData(item);
        if (fetchedImages.length > 0) {
          setModalPhoto(fetchedImages[0]);
        }
      } else {
        setModalPhoto(item);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const closeModal = () => {
    setModalPhoto(null);
  };

  return (
    <div className={styles.historyContainer}>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((item: string, index: number) => {
          const trimmedItem = typeof item === 'string' ? item.trim() : '';
          return (
            <li
              className={styles.searchedHistory}
              key={index}
              onClick={() => handleImageClick(trimmedItem)}
            >
              {trimmedItem}
            </li>
          );
        })}
      </ul>
      {modalPhoto && <Modal modalPhoto={modalPhoto} closeModal={closeModal} />}
    </div>
  );
};

export default HistoryPage;