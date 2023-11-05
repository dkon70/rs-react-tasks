import style from './SearchBar.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import { SearchProps } from '../types/Types';
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({ dataTransfer }: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || ''
  );

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    dataTransfer(inputValue);
    setInputValue('');
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('prevSearch')) {
      dataTransfer(inputValue);
    } else {
      dataTransfer('');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('prevSearch', searchParams.get('search') || '');
  }, [searchParams]);

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
