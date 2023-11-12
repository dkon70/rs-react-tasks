import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Elem, MainProps } from '../../components/types/Types';
import { useAppContext } from '../../components/Context/Context';

const Main = (props: MainProps) => {
  const { loading } = props;

  const { dataContext } = useAppContext();

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
