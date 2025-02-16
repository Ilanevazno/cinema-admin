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
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const handleAddCategory = () => {
    setEditingCategory({ name: '', subCategories: [] });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = (category: Category) => {
    if (category.id) {
      setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    } else {
      setCategories([...categories, { ...category, id: Date.now() }]);
    }
    setEditingCategory(null);
    navigate('/categories');
  };

  const handleDeleteCategory = (categoryId: number) => {
    openDialog({
      title: 'Удаление категории',
      content: 'Вы уверены, что хотите удалить эту категорию?',
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      onConfirm: () => {
        setCategories(categories.filter((c) => c.id !== categoryId));
        setDeletedCategories([...deletedCategories, { id: String(categoryId) }]);
        closeDialog();
      },
    });
  };

  const handleSaveChanges = () => {
    const changes: CategoryChanges = {
      newCategories: categories.filter((c) => !c.id),
      updatedCategories: categories
        .filter((c) => c.id)
        .map((c) => ({
          id: String(c.id),
          name: c.name,
          updatedSubCategories: c.subCategories,
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
    categoryToDelete,
    handleAddCategory,
    handleEditCategory,
    handleSaveCategory,
    handleDeleteCategory,
    handleSaveChanges,
    setEditingCategory,
  };
};
