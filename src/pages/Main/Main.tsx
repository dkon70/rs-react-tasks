import Loader from '../../components/Loader/Loader';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Elem, MainProps } from '../../components/types/Types';

const Main = (props: MainProps) => {
  const {loading, data, firstLoad} = props;

  return (
      <>
      {loading ? (
        <Loader />
      ) : data.products && data.products.length > 0 ? (
        data.products.map((el: Elem) => {
          return (
            <ProductCard
              key={el.title}
              title={el.title}
              thumbnail={el.thumbnail}
              description={el.description}
              price={el.price}
            />
          );
        })
      ) : firstLoad ? (
        <h1></h1>
      ) : (
        <h1>No Data</h1>
      )}
    </>
  )
}

export default Main;