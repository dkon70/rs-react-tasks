import { describe, test, expect } from 'vitest';
import SearchBar from '../components/SearchBar/SearchBar';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Tests for the Search component', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </BrowserRouter>
    );
    const input = screen.getByTestId('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    const button = screen.getByTestId('button') as HTMLButtonElement;
    fireEvent.click(button);
    expect(localStorage.getItem('prevSearch')).toBe('test');
  });

  test('component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('prevSearch', 'test');

    render(
      <BrowserRouter>
        <Provider store={store}>
          <SearchBar />
        </Provider>
      </BrowserRouter>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe(localStorage.getItem('prevSearch'));
  });
});
