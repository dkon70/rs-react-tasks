import App from '../App';
import ProductPage from '../components/ProductPage/ProductPage';
import NotFound from '../pages/NotFound/NotFound';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<App />} />
          <Route path=':id' element={<ProductPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
