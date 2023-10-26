import style from './SearchBar.module.scss';
import { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <input
          className={style.input}
          type='text'
          placeholder='type something...'
        />
        <button className={style.button}>Search</button>
      </div>
    );
  }
}

export default SearchBar;