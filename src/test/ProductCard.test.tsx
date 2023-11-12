import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import ProductCard from '../components/ProductCard/ProductCard';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';
import { server } from './server';

const data = {
  id: 1,
  title: 'testTitle',
  description: 'testDescription',
  thumbnail: 'http://test.test/test',
  price: 500,
};

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
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
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <div data-testid="card">
                  <ProductCard
                    id={data.id}
                    title={data.title}
                    description={data.description}
                    thumbnail={data.thumbnail}
                    price={data.price}
                  />
                </div>
              }
            />
            <Route path="/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const card = screen.getByTestId('card');
    fireEvent.click(card.firstChild!);

    await waitFor(() => {
      expect(screen.getByText('sup!')).toBeInTheDocument();
    });
  });
});
