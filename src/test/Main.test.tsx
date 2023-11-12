import { test, expect, describe } from 'vitest';
import Main from '../pages/Main/Main';
import { render, screen } from '@testing-library/react';
import { AppContext } from '../components/Context/Context';
import { BrowserRouter } from 'react-router-dom';

describe('Tests for the Card List component', () => {
  test('renders the specified number of cards', () => {
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
