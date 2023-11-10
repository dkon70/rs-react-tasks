import style from './SearchBar.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../Context/Context';

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || ''
  );

  const { setInputContext } = useAppContext();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    localStorage.setItem('prevSearch', inputValue);
    setInputContext(inputValue);
    setInputValue('');
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('prevSearch')) {
      setInputContext(String(localStorage.getItem('prevSearch')));
    } else {
      setInputContext('');
    }
  }, []);

  return (
    <div className={style.wrapper}>
      <input
        className={style.input}
        type="text"
        placeholder="type something..."
        onChange={inputHandler}
        onKeyDown={keyPressHandler}
        value={inputValue}
      />
      <button className={style.button} onClick={submitHandler}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
