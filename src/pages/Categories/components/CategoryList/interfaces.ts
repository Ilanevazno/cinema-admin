import { Category, Film } from '@models';

export interface CategoryListProps {
  categories: Array<Category & { isTemp?: boolean }>;
  films: Film[];
  onEditCategory: (category: Category) => void;
  onAddCategory: () => void;
  onDeleteCategory: (categoryId: number | null, isTemp?: boolean) => void;
  onSaveChanges: () => void;
}
