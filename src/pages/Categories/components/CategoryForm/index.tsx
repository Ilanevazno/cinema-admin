import { memo, ReactElement, useCallback, useMemo } from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import FilmSelector from '../FilmSelector';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryFormProps } from './interfaces';
import { Category } from '@models';
import {
  StyledForm,
  StyledSubCategoryContainer,
  StyledButtonContainer,
  StyledHeader,
  StyledSubCategoryHeader,
} from './styles';
import { getFieldError } from './utils';
import { validationSchema } from './constants';
import { useLocation } from 'react-router-dom';

const CategoryForm = ({ category, films, onSave, onCancel }: CategoryFormProps): ReactElement => {
  const location = useLocation();
  const isCreating = location.pathname.includes('/create');

  const initialValues: Category = useMemo(
    () =>
      category || {
        name: '',
        subCategories: [],
      },
    [category]
  );

  const handleAddFilm = useCallback(
    (index: number, filmId: number, setFieldValue: Function, values: Category) => {
      setFieldValue(`subCategories.${index}.filmIds`, [
        ...(values.subCategories[index]?.filmIds || []),
        filmId,
      ]);
    },
    []
  );

  const handleRemoveFilm = useCallback(
    (index: number, filmId: number, setFieldValue: Function, values: Category) => {
      setFieldValue(
        `subCategories.${index}.filmIds`,
        values.subCategories[index]?.filmIds.filter((id) => id !== filmId) || []
      );
    },
    []
  );

  const renderSubCategory = useCallback(
    (
      subCategory: any,
      index: number,
      remove: Function,
      { handleChange, setFieldValue, touched, errors, values }: any
    ) => (
      <StyledSubCategoryContainer key={index} elevation={1}>
        <StyledSubCategoryHeader>
          <TextField
            fullWidth
            name={`subCategories.${index}.name`}
            label="Название подкатегории"
            value={subCategory.name}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            error={!!getFieldError(touched, errors, `subCategories.${index}.name`)}
            helperText={getFieldError(touched, errors, `subCategories.${index}.name`)}
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </StyledSubCategoryHeader>

        <FilmSelector
          selectedFilmIds={subCategory.filmIds}
          availableFilms={films}
          onAddFilm={(filmId) => handleAddFilm(index, filmId, setFieldValue, values)}
          onRemoveFilm={(filmId) => handleRemoveFilm(index, filmId, setFieldValue, values)}
        />
        {getFieldError(touched, errors, `subCategories.${index}.filmIds`) && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            {getFieldError(touched, errors, `subCategories.${index}.filmIds`)}
          </Typography>
        )}
      </StyledSubCategoryContainer>
    ),
    [films, handleAddFilm, handleRemoveFilm]
  );

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSave}>
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <StyledForm elevation={3}>
            <StyledHeader variant="h5" color="primary">
              {isCreating ? 'Создание категории' : 'Редактирование категории'}
            </StyledHeader>

            <TextField
              fullWidth
              name="name"
              label="Название категории"
              value={values.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              error={!!(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <FieldArray name="subCategories">
              {({ push, remove }) => (
                <>
                  {values.subCategories.map((subCategory, index) =>
                    renderSubCategory(subCategory, index, remove, {
                      handleChange,
                      setFieldValue,
                      touched,
                      errors,
                      values,
                    })
                  )}

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => push({ name: '', filmIds: [] })}
                    fullWidth
                    sx={{ my: 2 }}
                  >
                    Добавить подкатегорию
                  </Button>
                  {touched.subCategories &&
                    errors.subCategories &&
                    typeof errors.subCategories === 'string' && (
                      <Typography color="error" variant="caption">
                        {errors.subCategories}
                      </Typography>
                    )}
                </>
              )}
            </FieldArray>

            <StyledButtonContainer>
              <Button variant="contained" color="primary" type="submit" size="large">
                Сохранить
              </Button>
              <Button variant="outlined" onClick={onCancel} size="large">
                Отмена
              </Button>
            </StyledButtonContainer>
          </StyledForm>
        </Form>
      )}
    </Formik>
  );
};

export default memo(CategoryForm);
