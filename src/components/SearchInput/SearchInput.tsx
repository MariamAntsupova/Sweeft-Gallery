import React, { useRef, ChangeEvent } from 'react';
import styles from './SearchInput.module.css';
interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateHistory = (value: string) => {
    if (value.trim() !== '') {
      const storedHistory = localStorage.getItem('searchHistory');
      const searchHistory = storedHistory ? JSON.parse(storedHistory) : [];
      if (!searchHistory.includes(value)) {
        const updatedHistory = [...searchHistory, value];
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      }
    }
  };
  const handleInputSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    if (searchInputRef.current) {
      const inputValue = searchInputRef.current.value;
      onSearch(inputValue);
      updateHistory(inputValue);

    } else {
      console.error('Ref is not defined');
    }
  };

  return (
    <div className={styles.searchContainer}>
      <h1> Search Image Here ! </h1>
      <input
        type="text"
        placeholder="Search..."
        ref={searchInputRef}
        className={styles.searchInput} 
        onChange={handleInputSearch}
      />
    </div>
  );
};

export default SearchInput;
