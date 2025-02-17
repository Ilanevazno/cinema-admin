import { memo, ReactElement, useCallback, useMemo } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryListProps } from './interfaces';
import {
  StyledButton,
  StyledButtonContainer,
  StyledCategoryContainer,
  StyledCategoryHeader,
  StyledFilmContainer,
  StyledSubCategoryContainer,
} from './styles';

const CategoryList = ({
  categories,
  films,
  onEditCategory,
  onAddCategory,
  onDeleteCategory,
  onSaveChanges,
}: CategoryListProps): ReactElement => {
  const getFilmName = useMemo(() => {
    return (filmId: number): string => {
      return films.find((film) => film.id === filmId)?.name || '';
    };
  }, [films]);

  const mapFilmIds = useCallback(
    (filmId: number) => {
      return (
        <StyledFilmContainer key={filmId}>
          <Typography variant="body2">{getFilmName(filmId)}</Typography>
        </StyledFilmContainer>
      );
    },
    [getFilmName]
  );

  return (
    <Box>
      <StyledButtonContainer>
        <StyledButton variant="contained" color="primary" onClick={onAddCategory} size="large">
          Добавить категорию
        </StyledButton>
        <StyledButton variant="contained" color="success" onClick={onSaveChanges} size="large">
          Сохранить изменения
        </StyledButton>
      </StyledButtonContainer>

      {categories.length === 0 ? (
        <StyledCategoryContainer elevation={2}>
          <Typography variant="h6" color="text.secondary" textAlign="center" py={4}>
            Создайте первую категорию
          </Typography>
        </StyledCategoryContainer>
      ) : (
        categories.map((category) => (
          <StyledCategoryContainer key={category.id || category.name} elevation={2}>
            <StyledCategoryHeader>
              <Typography variant="h6" color="primary">
                {category.name}
              </Typography>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => onEditCategory(category)}
                >
                  Редактировать
                </Button>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => onDeleteCategory(category.id || null)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </StyledCategoryHeader>

            {category.subCategories.map((subCategory) => (
              <StyledSubCategoryContainer key={subCategory.id || subCategory.name}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {subCategory.name}
                </Typography>

                {subCategory.filmIds.map(mapFilmIds)}
              </StyledSubCategoryContainer>
            ))}
          </StyledCategoryContainer>
        ))
      )}
    </Box>
  );
};

export default memo(CategoryList);
