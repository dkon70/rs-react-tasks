import App from '../App';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../pages/NotFound/NotFound';

describe('Tests for the 404 Page component', () => {
  test('404 page is displayed when navigating to an invalid route', async () => {
    render(
      <MemoryRouter initialEntries={['/qwerty/qwerty']}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    const error = screen.getByText('404');
    expect(error).toBeInTheDocument();
  });
});
