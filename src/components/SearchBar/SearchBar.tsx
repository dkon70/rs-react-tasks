import style from './SearchBar.module.scss';
import { Component } from 'react';
import React from 'react';

type SearchProps = {
  dataTransfer: (value: string) => void;
};

class SearchBar extends Component<SearchProps> {
  state = { inputValue: '' };

  private inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  private submitHandler = () => {
    this.props.dataTransfer(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  private keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  };

  render() {
    return (
      <div className={style.wrapper}>
        <input
          className={style.input}
          type="text"
          placeholder="type something..."
          onChange={this.inputHandler}
          onKeyDown={this.keyPressHandler}
          value={this.state.inputValue}
        />
        <button className={style.button} onClick={this.submitHandler}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
