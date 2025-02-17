import { useState, useCallback } from 'react';
import { Category } from '@models';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategories, setNewCategories] = useState<Category[]>([]);
  const [updatedCategories, setUpdatedCategories] = useState<Category[]>([]);
  const [deletedCategoryIds, setDeletedCategoryIds] = useState<string[]>([]);

  const addCategory = useCallback((category: Category) => {
    setNewCategories((prev) => [...prev, category]);
    setCategories((prev) => [...prev, category]);
  }, []);

  const updateCategory = useCallback((category: Category) => {
    if (category.id) {
      setUpdatedCategories((prev) => [...prev, category]);
      setCategories((prev) => prev.map((cat) => (cat.id === category.id ? category : cat)));
    }
  }, []);

  const deleteCategory = useCallback((categoryId: number | null) => {
    if (categoryId) {
      setDeletedCategoryIds((prev) => [...prev, categoryId.toString()]);
      setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
    }
  }, []);

  const saveChanges = useCallback(async () => {
    setNewCategories([]);
    setUpdatedCategories([]);
    setDeletedCategoryIds([]);
  }, []);

  return {
    categories,
    newCategories,
    updatedCategories,
    deletedCategoryIds,
    addCategory,
    updateCategory,
    deleteCategory,
    saveChanges,
  };
};
