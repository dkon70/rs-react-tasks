import ProductCard from '../../components/ProductCard/ProductCard';
import { Elem, MainProps } from '../../components/types/Types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './Main.module.scss';

const Main = (props: MainProps) => {
  const { data } = props;
  const router = useRouter();

  return (
    <>
      {data && data.products.length !== 0 ? (
        data.products.map((el: Elem) => {
          return (
            <Link
              key={el.id}
              href={{
                pathname: `/${el.id}`,
                query: {
                  id: el.id,
                  search: router.query.search,
                  page: router.query.page,
                  productsPerPage: router.query.productsPerPage,
                },
              }}
              className={style.link}
            >
              <ProductCard
                title={el.title}
                thumbnail={el.thumbnail}
                description={el.description}
                price={el.price}
                id={el.id}
              />
            </Link>
          );
        })
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
};

export default Main;
