import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import AppRouter from './AppRouter/AppRouter';
import { AppProvider } from './components/Context/Context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <RouterProvider router={AppRouter} />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
