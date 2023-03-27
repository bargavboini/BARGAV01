import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'layout/error-boudaries';

import Product from '../pages/product/product-list';
import ProductCreate from '../pages/product/product-create';
import ProductEdit from '../pages/product/product-edit';
import Layout from '../layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Product />
      </Layout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/:productId',
    element: (
      <Layout>
        <ProductEdit />
      </Layout>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/create',
    element: (
      <Layout>
        <ProductCreate />
      </Layout>
    ),
    errorElement: <ErrorBoundary />,
  },
]);

export default router;
