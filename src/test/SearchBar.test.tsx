import SearchBar from '@/components/SearchBar/SearchBar';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('search bar component tests', () => {
  test('search bar renders correctly', () => {
    render(<SearchBar />);

    const button = screen.getByText('Search');
    const input = screen.getByTestId('input');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test('value can be changed', () => {
    render(<SearchBar />);

    const input: HTMLInputElement = screen.getByTestId('input');
    input.value = '123';
    expect(input.value).toBe('123');
  });
});
