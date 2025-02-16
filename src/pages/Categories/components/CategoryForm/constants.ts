import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название категории обязательно'),
  subCategories: Yup.array()
    .min(1, 'Необходимо добавить хотя бы одну подкатегорию')
    .of(
      Yup.object().shape({
        name: Yup.string().required('Название подкатегории обязательно'),
        filmIds: Yup.array().min(1, 'Необходимо добавить хотя бы один фильм'),
      })
    ),
});
