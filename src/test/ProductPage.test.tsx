import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Product from '@/pages/[id]';
import { mockData, mockCardData } from './mockData';

describe('product page tests', () => {
  test('renders data on product page correctly', () => {
    render(<Product data={mockData} card={mockCardData} />);
    const title = screen.getByText('testTitle');
    expect(title).toBeInTheDocument();
  });
});
