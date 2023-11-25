import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    router.push({
      pathname: '/',
      query: {
        search: inputValue,
        page: router.query.page,
        productsPerPage: router.query.productsPerPage,
      },
    });
    setInputValue('');
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="type something..."
        onChange={inputHandler}
        onKeyDown={keyPressHandler}
        value={inputValue}
        data-testid="input"
      />
      <button
        className={styles.button}
        onClick={submitHandler}
        data-testid="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
