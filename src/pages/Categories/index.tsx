import { Box } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import { useCategories } from '@providers';
import { initialData } from '@shared';

const Categories = () => {
  const navigate = useNavigate();
  const {
    categories,
    editingCategory,
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveChanges,
    setEditingCategory,
  } = useCategories();

  const handleCancel = () => {
    setEditingCategory(undefined);
    navigate('/categories');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box maxWidth={1200} margin="0 auto" p={3}>
        <Routes>
          <Route
            path="/"
            element={
              <CategoryList
                categories={categories}
                films={initialData.films}
                onEditCategory={(category) => {
                  handleEditCategory(category);
                  navigate(`/categories/update/${category.id}`);
                }}
                onAddCategory={() => {
                  handleAddCategory();
                  navigate('/categories/create');
                }}
                onDeleteCategory={handleDeleteCategory}
                onSaveChanges={handleSaveChanges}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CategoryForm
                films={initialData.films}
                onSave={handleSaveCategory}
                onCancel={handleCancel}
              />
            }
          />
          <Route
            path="/update/:id"
            element={
              <CategoryForm
                category={editingCategory}
                films={initialData.films}
                onSave={handleSaveCategory}
                onCancel={handleCancel}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default Categories;
