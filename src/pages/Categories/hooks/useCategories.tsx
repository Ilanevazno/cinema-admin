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
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);
  const [deletedCategories, setDeletedCategories] = useState<{ id: string }[]>([]);

  const handleAddCategory = () => {
    const newCategory = {
      name: '',
      subCategories: [],
      id: Date.now(),
    };
    setEditingCategory(newCategory);
    setCategories([...categories, newCategory]);
    navigate('/categories/create');
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategories(
        categories.map((currentCategory) =>
          currentCategory.id === editingCategory.id
            ? { ...category, id: editingCategory.id }
            : currentCategory
        )
      );
    }

    setEditingCategory(undefined);
    navigate('/categories');
  };

  const handleDeleteCategory = (categoryId: number | null) => {
    openDialog({
      title: 'Удаление категории',
      content: 'Вы уверены, что хотите удалить эту категорию?',
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      onConfirm: () => {
        if (categoryId) {
          setDeletedCategories([...deletedCategories, { id: String(categoryId) }]);
        }
        setCategories(categories.filter((currentCategory) => currentCategory.id !== categoryId));
        closeDialog();
      },
    });
  };

  const handleSaveChanges = () => {
    const changes: CategoryChanges = {
      newCategories: categories
        .filter((category) => !initialData.categories.some((initial) => initial.id === category.id))
        .map(({ id, ...categoryData }) => categoryData),
      updatedCategories: categories
        .filter((category) => initialData.categories.some((initial) => initial.id === category.id))
        .map((category) => ({
          id: Number(category.id),
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
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveChanges,
    setEditingCategory,
  };
};
