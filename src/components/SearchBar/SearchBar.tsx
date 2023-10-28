import style from './SearchBar.module.scss';
import { Component } from 'react';
import React from 'react';

type SearchProps = {
  dataTransfer: (value: string) => void;
};

class SearchBar extends Component<SearchProps> {
  state = { inputValue: localStorage.getItem('prevSearch') || '' };

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  submitHandler = () => {
    this.props.dataTransfer(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.submitHandler();
    }
  };

  componentDidMount(): void {
    if (localStorage.getItem('prevSearch')) {
      this.submitHandler();
    }
  }

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
