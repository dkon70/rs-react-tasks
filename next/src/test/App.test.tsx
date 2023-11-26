import Home from '@/pages';
import { test, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mockData } from './mockData';

describe('main page tests', () => {
  test('renders data correctly', () => {
    render(<Home data={mockData} />);
    const price = screen.getByText('test - 100$');

    expect(price).toBeInTheDocument();
  });
});
