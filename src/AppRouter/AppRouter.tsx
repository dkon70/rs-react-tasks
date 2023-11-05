import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ProductPage from '../components/ProductPage/ProductPage';

const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:id',
        element: <ProductPage />,
      },
    ],
  },
]);

export default AppRouter;
