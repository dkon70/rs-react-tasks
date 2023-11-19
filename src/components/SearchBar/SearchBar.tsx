import style from './SearchBar.module.scss';
import React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setInputContext } from '../../redux/inputSlice';

const SearchBar = () => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') || ''
  );

  const dispatch = useDispatch();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const submitHandler = () => {
    localStorage.setItem('prevSearch', inputValue);
    dispatch(setInputContext(inputValue));
    setInputValue('');
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('prevSearch')) {
      dispatch(setInputContext(String(localStorage.getItem('prevSearch'))));
      setInputValue(String(localStorage.getItem('prevSearch')));
    } else {
      dispatch(setInputContext(''));
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
        data-testid="input"
      />
      <button
        className={style.button}
        onClick={submitHandler}
        data-testid="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
