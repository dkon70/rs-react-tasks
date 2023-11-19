import { test, expect, describe } from 'vitest';
import Main from '../pages/Main/Main';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockContextData } from './mockContextData';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Tests for the Card List component', () => {
  test('renders the specified number of cards', () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main firstLoad={true} />
        </Provider>
      </BrowserRouter>
    );

    const cards = container.childNodes;

    expect(cards.length).toBe(mockContextData.products.length);
  });

  test('appropriate message is displayed if no cards are present', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main firstLoad={true} />
        </Provider>
      </BrowserRouter>
    );

    const message = screen.getByText('No Data');

    expect(message).toBeInTheDocument();
  });
});
