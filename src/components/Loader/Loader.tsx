import style from './Loader.module.scss';
import { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <>
        <h1 className={style.heading}>Loading...</h1>
      </>
    );
  }
}

export default Loader;
