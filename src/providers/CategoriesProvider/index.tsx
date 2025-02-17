import {
  createContext,
  useContext,
  ReactElement,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Category } from '@models';
import { useCategories as useCategoriesHook } from './hooks/useCategories';

interface UseCategoriesReturn {
  categories: Category[];
  editingCategory: Category | undefined;
  handleAddCategory: () => void;
  handleEditCategory: (category: Category) => void;
  handleSaveCategory: (category: Category) => void;
  handleDeleteCategory: (categoryId: number | null) => void;
  handleSaveChanges: () => void;
  setEditingCategory: Dispatch<SetStateAction<Category | undefined>>;
}

const CategoriesContext = createContext<UseCategoriesReturn | undefined>(undefined);

interface CategoriesProviderProps {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: CategoriesProviderProps): ReactElement => {
  const categoriesData = useCategoriesHook();

  return <CategoriesContext.Provider value={categoriesData}>{children}</CategoriesContext.Provider>;
};

export const useCategories = (): UseCategoriesReturn => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
