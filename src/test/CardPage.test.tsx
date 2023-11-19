import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import ProductCard from '../components/ProductCard/ProductCard';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from '../components/ProductPage/ProductPage';
import { server } from './server';
import { data } from './mockData';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

describe('Tests for the Detailed Card component', () => {
  test('loading indicator is displayed while fetching data', async () => {
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

    const loader = screen.getByText('Loading...');
    expect(loader).toBeInTheDocument();
  });

  test('detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <ProductPage />
        </Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const title = screen.getByText('sup!');
      const description = screen.getByText('testDescription');
      const price = screen.getByText('500$');
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });

  test('clicking the close button hides the component', async () => {
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

    await waitFor(() => {
      const button = screen.getByText('Close');
      fireEvent.click(button);
      expect(button).not.toBeInTheDocument();
    });
  });

  test('path displays correctly', () => {
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

    expect(global.location.pathname).toBe('/1');
  });
});
