import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Purchased = lazy(() => import('src/pages/myPages/purchased'))
export const PurchasedOrder = lazy(() => import('src/pages/myPages/purchasedOrder'))
export const Sales = lazy(() => import('src/pages/myPages/sales'))
export const SalesOrder = lazy(() => import('src/pages/myPages/salesOrder'))

// ----------------------------------------------------------------------

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log('token:', !!token)
  return !!token;
}

console.log(isAuthenticated())

export default function Router() {

  const routes = useRoutes([
    {
      path: '/',
      element: isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />,
      // element: isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />,
    },
    {
      element: (
        isAuthenticated &&
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>/
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // { element: <IndexPage />, index: true },
        { path: "/dashboard", element: isAuthenticated() ? <IndexPage /> : <Navigate to="/" />  },
        { path: 'user', element: isAuthenticated() ?  <UserPage /> : <Navigate to="/" /> },
        { path: 'products', element: isAuthenticated() ? <ProductsPage />  : <Navigate to="/" />  },
        { path: 'purchased', element:isAuthenticated() ? <Purchased /> : <Navigate to="/" /> },
        { path: 'purchasedOrder', element: isAuthenticated() ? <PurchasedOrder /> : <Navigate to="/"/>},
        { path: 'sales', element: isAuthenticated() ?  <Sales /> : <Navigate to="/" />},
        { path: 'salesOrder', element: isAuthenticated() ?  <SalesOrder /> :<Navigate to="/" />  },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
