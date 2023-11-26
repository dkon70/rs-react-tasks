import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/404';

describe('404 page tests', () => {
  test('renders 404 page', () => {
    render(<NotFound />);

    const notFound = screen.getByText('404');
    expect(notFound).toBeInTheDocument();
  });
});
