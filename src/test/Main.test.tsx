import { test, expect, describe } from 'vitest';
import Main from '../pages/Main/Main';
import { render, screen } from '@testing-library/react';
import { AppContext } from '../components/Context/Context';
import { BrowserRouter } from 'react-router-dom';
import { mockContextData } from './mockContextData';

describe('Tests for the Card List component', () => {
  test('renders the specified number of cards', () => {

    const { container } = render(
      <BrowserRouter>
        <AppContext.Provider
          value={{
            inputContext: '',
            setInputContext: () => {},
            dataContext: mockContextData,
            setDataContext: () => {},
          }}
        >
          <Main loading={false} firstLoad={true} />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const cards = container.childNodes;

    expect(cards.length).toBe(mockContextData.products.length);
  });

  test('appropriate message is displayed if no cards are present', () => {
    const mockContextData = {
      products: [],
    };

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
          <Main loading={false} firstLoad={true} />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const message = screen.getByText('No Data');

    expect(message).toBeInTheDocument();
  });
});
