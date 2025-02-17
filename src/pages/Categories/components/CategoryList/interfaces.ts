import { Category, Film } from '@models';

export interface CategoryListProps {
  categories: Category[];
  films: Film[];
  onEditCategory: (category: Category) => void;
  onAddCategory: () => void;
  onDeleteCategory: (categoryId: number | null) => void;
  onSaveChanges: () => void;
}
