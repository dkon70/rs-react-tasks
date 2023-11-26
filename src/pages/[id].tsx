import style from '../styles/ProductPage.module.scss';
import { useRouter } from 'next/router';
import { wrapper } from './api/store';
import { getItem, getProduct } from './api/api';
import { getRunningQueriesThunk } from './api/api';
import { Data, Elem } from '@/components/types/Types';
import Link from 'next/link';
import Image from 'next/image';
import Layout from './layout';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { data } = await store.dispatch(
      getProduct.initiate({
        name: String(context.query.search) || '',
        limit: Number(context.query.productsPerPage) || 5,
        skip: Number(context.query.page)
          ? Number(context.query.page) === 1
            ? 0
            : Number(context.query.page) *
                Number(context.query.productsPerPage) -
              Number(context.query.productsPerPage)
          : 0 || 0,
      })
    );

    const { data: card } = await store.dispatch(
      getItem.initiate({
        id: Number(context.query.id),
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data, card },
    };
  }
);

const Product = ({ data, card }: { data: Data; card: Elem }) => {
  const router = useRouter();
  const item = card;

  return (
    <Layout data={data}>
      <div className={style.wrapper}>
        <Image src={item.thumbnail} alt={item.title} width={700} height={350} />
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.price}$</p>
        <Link
          href={{
            pathname: '/',
            query: {
              search: router.query.search,
              page: router.query.page,
              productsPerPage: router.query.productsPerPage,
            },
          }}
        >
          <button>Close</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Product;
