import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Tests for the App component', () => {
  test('app set default query params on load', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(global.location.search).toBe('?search=&page=1&productsPerPage=5');
  });

  test('app renders correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
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
