import '@/styles/globals.scss';
import '../assets/fonts/Ubuntu/stylesheet.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './api/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.push({
      pathname: '/',
      query: {
        search: router.query.search || '',
        page: router.query.page || 1,
        productsPerPage: router.query.productsPerPage || 5,
      },
    });
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
