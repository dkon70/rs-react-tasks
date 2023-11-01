import style from './SearchBar.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';

type SearchProps = {
  dataTransfer: (value: string) => void;
};

const SearchBar = ({ dataTransfer }: SearchProps) => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('prevSearch') || ''
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
