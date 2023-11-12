import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppContext } from '../components/Context/Context';
import { mockContextData } from './mockContextData';
import App from '../App';

describe('Tests for the App component', () => {
  test('app set default query params on load', () => {
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
          <App />
        </AppContext.Provider>
      </BrowserRouter>
    );

    expect(global.location.search).toBe('?search=&page=1&productsPerPage=5');
  });

  test('app renders correctly', () => {
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
          <App />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const searchButton = screen.getByText('Search');
    const nextButton = screen.getByText('next');
    const loader = screen.getByText('Loading...');
    expect(searchButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
  });
});
