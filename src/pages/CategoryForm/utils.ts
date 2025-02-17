import { Category } from '@models';
import { FormikTouched } from 'formik';

import { FormikErrors } from 'formik';

export const getFieldError = (
  touched: FormikTouched<Category>,
  errors: FormikErrors<Category>,
  path: string
): string | undefined => {
  const isTouched = getNestedValue(touched, path);
  const error = getNestedValue(errors, path);

  return isTouched ? (error as string) : undefined;
};

export const getNestedValue = <T extends Record<string, any>>(obj: T, path: string): any => {
  return path
    .split('.')
    .reduce((acc, key) => (acc && typeof acc === 'object' ? acc[key] : undefined), obj);
};
