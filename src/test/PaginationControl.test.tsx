import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginationControls from '../components/PaginationControls/PaginationControls';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Tests for the Pagination component', () => {
  test('component updates URL query parameter when page changes', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <PaginationControls
            page={1}
            products={1}
            total={7}
            prevPage={() => {}}
            nextPage={() => {}}
          />
        </Provider>
      </BrowserRouter>
    );
    const nextButton = screen.getByTestId('nextButton');
    fireEvent.click(nextButton);
    expect(global.location.search).toBe('?search=&page=2&productsPerPage=1');
  });
});
