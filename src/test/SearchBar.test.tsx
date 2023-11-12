import { describe, test, expect } from 'vitest';
import SearchBar from '../components/SearchBar/SearchBar';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../components/Context/Context';

const mockContextData = {
  products: [
    {
      id: 1,
      title: 'Product1',
      thumbnail: 'url1',
      description: 'Description1',
      price: 10,
    },
    {
      id: 2,
      title: 'Product2',
      thumbnail: 'url2',
      description: 'Description2',
      price: 20,
    },
    {
      id: 3,
      title: 'Product3',
      thumbnail: 'url3',
      description: 'Description3',
      price: 30,
    },
  ],
};

describe('Tests for the Search component', () => {
  test('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <AppContext.Provider
          value={{
            inputContext: '',
            setInputContext: () => {},
            dataContext: mockContextData,
            setDataContext: () => {},
          }}
        >
          <SearchBar />
        </AppContext.Provider>
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
        <AppContext.Provider
          value={{
            inputContext: '',
            setInputContext: () => {},
            dataContext: mockContextData,
            setDataContext: () => {},
          }}
        >
          <SearchBar />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.value).toBe(localStorage.getItem('prevSearch'));
  });
});
