import { Category, Film } from '@models';

export interface CategoryFormProps {
  category?: Category;
  films: Film[];
  onSave: (category: Category) => void;
  onCancel: () => void;
}

export interface ValidationErrors {
  categoryName: string;
  subCategories: {
    name: string;
    films: string;
  }[];
}
