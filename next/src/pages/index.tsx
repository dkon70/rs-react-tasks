import { Data } from '@/components/types/Types';
import { wrapper } from './api/store';
import { getProduct } from './api/api';
import { getRunningQueriesThunk } from './api/api';
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

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  }
);

export default function Home({ data }: { data: Data }) {
  return (
    <>
      <Layout data={data}>{''}</Layout>
    </>
  );
}
