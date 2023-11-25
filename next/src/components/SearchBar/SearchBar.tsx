import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setInputContext } from '../../redux/inputSlice';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  // const dispatch = useDispatch();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    localStorage.setItem('prevSearch', inputValue);
    // dispatch(setInputContext(inputValue));
    setInputValue('');
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  useEffect(() => {
    const storedValue = localStorage.getItem('prevSearch');
    if (storedValue) {
      // dispatch(setInputContext(String(storedValue)));
      setInputValue(String(storedValue));
    } else {
      // dispatch(setInputContext(''));
    }
  }, []);

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
