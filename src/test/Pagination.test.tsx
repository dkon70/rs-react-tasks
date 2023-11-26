import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

describe('Tests for the Pagination component', () => {
  test('component renders correctly', async () => {
    render(
      <PaginationControls
        page={1}
        products={5}
        total={10}
        productsPerPage={1}
        prevPage={() => {}}
        nextPage={() => {}}
      />
    );

    const nextButton = screen.getByTestId('nextButton');
    const prevButton = screen.getByText('prev');
    const submit = screen.getByText('Submit');

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
