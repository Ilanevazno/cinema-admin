import { useState } from 'react';
import { Category, CategoryChanges } from '@models';
import { useNavigate } from 'react-router-dom';

import { initialData } from '../constants';
import { useDialog, useSnackbar } from '@providers';

export const useCategories = () => {
  const { showSnackbar } = useSnackbar();
  const { openDialog, closeDialog } = useDialog();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>(initialData.categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletedCategories, setDeletedCategories] = useState<{ id: string }[]>([]);

  const handleAddCategory = () => {
    setEditingCategory({ 
      name: '', 
      subCategories: [], 
      id: null,
      tempId: Date.now()
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (category: Category) => {
    if (category.id) {
      setCategories(categories.map((currentCategory) => (currentCategory.id === category.id ? category : currentCategory)));
    } else {
      setCategories([...categories, { 
        ...category, 
        id: null,
        tempId: category.tempId || Date.now()
      }]);
    }
    setEditingCategory(null);
    navigate('/categories');
  };

  const handleDeleteCategory = (categoryId: string | number | null, tempId?: number) => {
    openDialog({
      title: 'Удаление категории',
      content: 'Вы уверены, что хотите удалить эту категорию?',
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      onConfirm: () => {
        if (typeof categoryId === 'number') {
          setDeletedCategories([...deletedCategories, { id: String(categoryId) }]);
        }
        setCategories(categories.filter(({ id, tempId: currentCategoryTempId }) => {
          if (id === null) {
            return currentCategoryTempId !== tempId;
          }
          return id !== categoryId;
        }));
        closeDialog();
      },
    });
  };

  const handleSaveChanges = () => {
    const changes: CategoryChanges = {
      newCategories: categories
        .filter((category) => category.id === null)
        .map(({ tempId, id, ...category }) => category),
      updatedCategories: categories
        .filter((category) => typeof category.id === 'number')
        .map((category) => ({
          id: String(category.id),
          name: category.name,
          updatedSubCategories: category.subCategories,
          deletedSubCategories: [],
        })),
      deletedCategories,
    };

    console.log({ changes });
    showSnackbar({ message: 'Изменения успешно сохранены' });
  };

  return {
    categories,
    editingCategory,
    deletedCategories,
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveChanges,
    setEditingCategory,
  };
};
