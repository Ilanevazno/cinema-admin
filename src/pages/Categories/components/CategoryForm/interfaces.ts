import { Category, Film } from '@models';

export interface CategoryFormProps {
  category?: Category | null;
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
