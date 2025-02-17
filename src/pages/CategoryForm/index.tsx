import { memo, ReactElement, useCallback, useMemo } from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import { Formik, Form, FieldArray } from 'formik';
import FilmSelector from './components/FilmSelector';
import DeleteIcon from '@mui/icons-material/Delete';
import { Category, SubCategory } from '@models';
import {
  StyledForm,
  StyledSubCategoryContainer,
  StyledButtonContainer,
  StyledHeader,
  StyledSubCategoryHeader,
} from './styles';
import { getFieldError } from './utils';
import { validationSchema } from './constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormikHelpers } from 'src/shared/interfaces';
import { useCategories } from '@providers';
import { initialData } from '@shared/constants';

const CategoryForm = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreating = location.pathname.includes('/create');

  const { editingCategory, handleSaveCategory, setEditingCategory } = useCategories();

  const initialValues: Category = useMemo(
    () =>
      editingCategory || {
        name: '',
        subCategories: [],
      },
    [editingCategory]
  );

  const handleCancel = () => {
    setEditingCategory(undefined);
    navigate('/');
  };

  const handleAddFilm = useCallback(
    (
      index: number,
      filmId: number,
      setFieldValue: FormikHelpers<Category>['setFieldValue'],
      values: Category
    ) => {
      setFieldValue(`subCategories.${index}.filmIds`, [
        ...(values.subCategories[index]?.filmIds || []),
        filmId,
      ]);
    },
    []
  );

  const handleRemoveFilm = useCallback(
    (
      index: number,
      filmId: number,
      setFieldValue: FormikHelpers<Category>['setFieldValue'],
      values: Category
    ) => {
      setFieldValue(
        `subCategories.${index}.filmIds`,
        values.subCategories[index]?.filmIds.filter((id) => id !== filmId) || []
      );
    },
    []
  );

  const renderSubCategory = useCallback(
    (
      subCategory: SubCategory,
      index: number,
      remove: (index: number) => void,
      formikHelpers: FormikHelpers<Category>
    ) => (
      <StyledSubCategoryContainer key={index} elevation={1}>
        <StyledSubCategoryHeader>
          <TextField
            fullWidth
            name={`subCategories.${index}.name`}
            label="Название подкатегории"
            value={subCategory.name}
            onChange={formikHelpers.handleChange}
            margin="normal"
            variant="outlined"
            error={
              !!getFieldError(
                formikHelpers.touched,
                formikHelpers.errors,
                `subCategories.${index}.name`
              )
            }
            helperText={getFieldError(
              formikHelpers.touched,
              formikHelpers.errors,
              `subCategories.${index}.name`
            )}
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </StyledSubCategoryHeader>

        <FilmSelector
          selectedFilmIds={subCategory.filmIds}
          availableFilms={initialData.films}
          onAddFilm={(filmId) =>
            handleAddFilm(index, filmId, formikHelpers.setFieldValue, formikHelpers.values)
          }
          onRemoveFilm={(filmId) =>
            handleRemoveFilm(index, filmId, formikHelpers.setFieldValue, formikHelpers.values)
          }
        />
        {getFieldError(
          formikHelpers.touched,
          formikHelpers.errors,
          `subCategories.${index}.filmIds`
        ) && (
          <Typography color="error" variant="caption" sx={{ mt: 1 }}>
            {getFieldError(
              formikHelpers.touched,
              formikHelpers.errors,
              `subCategories.${index}.filmIds`
            )}
          </Typography>
        )}
      </StyledSubCategoryContainer>
    ),
    [handleAddFilm, handleRemoveFilm]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSaveCategory}
    >
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
              <Button variant="outlined" onClick={handleCancel} size="large">
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
