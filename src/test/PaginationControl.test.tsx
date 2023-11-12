import { describe, test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppContext } from '../components/Context/Context';
import { mockContextData } from './mockContextData';
import PaginationControls from '../components/PaginationControls/PaginationControls';

describe('Tests for the Pagination component', () => {
  test('component updates URL query parameter when page changes', () => {
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
          <PaginationControls
            page={1}
            products={1}
            total={7}
            prevPage={() => {}}
            nextPage={() => {}}
          />
        </AppContext.Provider>
      </BrowserRouter>
    );
    const nextButton = screen.getByTestId('nextButton');
    fireEvent.click(nextButton);
    expect(global.location.search).toBe('?search=&page=2&productsPerPage=1');
  });
});
