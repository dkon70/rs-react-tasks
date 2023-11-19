import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Elem, MainProps } from '../../components/types/Types';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../redux/store';

const Main = (props: MainProps) => {
  const { data } = props;

  const dataContext = data!;

  const loading = useSelector((state: RootState) => state.searchLoader.loader);

  return (
    <>
      {loading ? (
        <Loader />
      ) : dataContext.products && dataContext.products.length > 0 ? (
        dataContext.products.map((el: Elem) => {
          return (
            <ProductCard
              key={el.title}
              title={el.title}
              thumbnail={el.thumbnail}
              description={el.description}
              price={el.price}
              id={el.id}
            />
          );
        })
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
};

export default Main;
