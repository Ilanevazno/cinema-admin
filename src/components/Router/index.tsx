import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, ReactElement } from 'react';
import PageLoader from '@components/PageLoader';

const Categories = lazy(() => import('@pages/Categories'));
const CategoriesUpdate = lazy(() => import('@pages/Categories/components/CategoryForm'));

const RouterComponent = (): ReactElement => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/categories/*" element={<Categories />} />
        <Route path="/categories/create" element={<CategoriesUpdate />} />
        <Route path="/categories/update/:id" element={<CategoriesUpdate />} />
        <Route path="/" element={<Navigate to="/categories" replace />} />
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;
