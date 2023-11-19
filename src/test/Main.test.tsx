import { test, expect, describe, beforeAll, afterEach, afterAll } from 'vitest';
import Main from '../pages/Main/Main';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { server } from './server';
import { mockContextData } from './mockContextData';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Tests for the Card List component', () => {
  test('renders the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main loading={false} data={mockContextData} />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBe(7);
    });
  });

  test('appropriate message is displayed if no cards are present', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main loading={false} />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const message = screen.getByText('No Data');
      expect(message).toBeInTheDocument();
    });
  });
});
