import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import ProductCard from '../components/ProductCard/ProductCard';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';
import { server } from './server';
import { data } from './mockData';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

let req: string;

server.events.on('request:start', ({ request }) => {
  req = request.method;
});

describe('Tests for the Card component', () => {
  test('card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <ProductCard
          id={data.id}
          title={data.title}
          description={data.description}
          thumbnail={data.thumbnail}
          price={data.price}
        />
      </BrowserRouter>
    );

    const title = screen.getByText(`${data.title} - ${data.price}$`);
    const description = screen.getByText(data.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <ProductCard
                    id={data.id}
                    title={data.title}
                    description={data.description}
                    thumbnail={data.thumbnail}
                    price={data.price}
                  />
                }
              />
              <Route path="/:id" element={<ProductPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    );

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    await waitFor(() => {
      expect(screen.getByText('sup!')).toBeInTheDocument();
    });
  });

  test('clicking triggers an additional API call to fetch detailed information', async () => {
    expect(req).toBe('GET');
  });
});
