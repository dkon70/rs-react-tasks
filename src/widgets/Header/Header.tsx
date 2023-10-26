import style from './Header.module.scss';
import { Component } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

class Header extends Component {
  render() {
    return(
      <header className={style.header}>
        <div className={style.wrapper}>
          <SearchBar />
        </div>
      </header>
    )
  }
}

export default Header;