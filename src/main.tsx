import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter/AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={AppRouter} />
    </ErrorBoundary>
  </React.StrictMode>
);
