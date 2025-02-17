import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';
import PageLoader from '@components/PageLoader';

const Categories = lazy(() => import('@pages/Categories'));
const CategoriesUpdate = lazy(() => import('@pages/CategoryForm'));
const NotFound = lazy(() => import('@pages/NotFound'));

const RouterComponent = (): ReactElement => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/categories/create" element={<CategoriesUpdate />} />
        <Route path="/categories/update/:id" element={<CategoriesUpdate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;
