import '@/styles/globals.scss';
import '../assets/fonts/Ubuntu/stylesheet.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './api/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
