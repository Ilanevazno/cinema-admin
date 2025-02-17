import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import { useCategories } from '@providers';
import { initialData } from '@shared';

const Categories = () => {
  const navigate = useNavigate();
  const {
    categories,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleSaveChanges,
  } = useCategories();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box maxWidth={1200} margin="0 auto" p={3}>
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
      </Box>
    </Box>
  );
};

export default Categories;
