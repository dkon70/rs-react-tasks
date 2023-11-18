import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppRouter from './AppRouter/AppRouter';
import { AppProvider } from './components/Context/Context';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
