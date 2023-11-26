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
    if (!router.query.page && !router.query.productsPerPage) {
      router.push({
        pathname: '/',
        query: {
          search: '',
          page: 1,
          productsPerPage: 5,
        },
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
