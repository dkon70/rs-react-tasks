import { test, expect, describe } from 'vitest';
import Main from '@/components/Main/Main';
import { render, screen, waitFor } from '@testing-library/react';
import { mockMultData } from './mockData';

describe('Tests for the Card List component', () => {
  test('renders the specified number of cards', async () => {
    render(<Main data={mockMultData} />);

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBe(7);
    });
  });

  test('appropriate message is displayed if no cards are present', async () => {
    render(<Main />);

    await waitFor(() => {
      const message = screen.getByText('No Data');
      expect(message).toBeInTheDocument();
    });
  });
});
