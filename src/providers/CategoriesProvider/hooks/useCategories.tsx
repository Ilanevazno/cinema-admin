import { useState } from 'react';
import { Category, CategoryChanges } from '@models';
import { useNavigate } from 'react-router-dom';

import { useDialog, useSnackbar } from '@providers';
import { initialData } from '@shared/constants';

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
            ? { ...category, id: editingCategory.id, isTemp: true }
            : currentCategory
        )
      );
    }

    setEditingCategory(undefined);
    navigate('/');
  };

  const handleDeleteCategory = (categoryId: number | null, isTemp: boolean = false) => {
    openDialog({
      title: 'Удаление категории',
      content: 'Вы уверены, что хотите удалить эту категорию?',
      confirmText: 'Удалить',
      cancelText: 'Отмена',
      onConfirm: () => {
        if (categoryId && !isTemp) {
          setDeletedCategories([...deletedCategories, { id: String(categoryId) }]);
        }
        setCategories(categories.filter((currentCategory) => currentCategory.id !== categoryId));
        closeDialog();
      },
    });
  };

  const getNewCategoriesToSave = () =>
    categories
      .filter((category) => !initialData.categories.some((initial) => initial.id === category.id))
      .map(({ name, subCategories }) => ({ name, subCategories }));

  const getUpdatedCategoriesToSave = () =>
    categories
      .filter((category) => initialData.categories.some((initial) => initial.id === category.id))
      .map((category) => ({
        id: Number(category.id),
        name: category.name,
        updatedSubCategories: category.subCategories,
        deletedSubCategories: [],
      }));

  const handleSaveChanges = () => {
    const changes: CategoryChanges = {
      newCategories: getNewCategoriesToSave(),
      updatedCategories: getUpdatedCategoriesToSave(),
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
