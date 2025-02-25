import { renderHook, act } from '@testing-library/react';
import { useCategories } from '../useCategories';
import { useDialog, useSnackbar } from '@providers';
import { useNavigate } from 'react-router-dom';

jest.mock('@shared/constants', () => ({
  initialData: {
    films: [
      { id: 1, name: 'The Matrix' },
      { id: 2, name: 'Inception' },
      { id: 3, name: 'Interstellar' },
      { id: 4, name: 'The Dark Knight' },
      { id: 5, name: 'Pulp Fiction' },
    ],
    categories: [
      {
        id: 1,
        name: 'Action',
        subCategories: [
          { id: 101, name: 'Sci-Fi', filmIds: [1, 2, 3] },
          { id: 102, name: 'Superheroes', filmIds: [1, 2, 4] },
        ],
      },
      {
        id: 2,
        name: 'Drama',
        subCategories: [
          { id: 201, name: 'Historical', filmIds: [1, 3, 5] },
          { id: 202, name: 'Romance', filmIds: [2, 3, 5] },
        ],
      },
    ],
  },
}));

jest.mock('@providers', () => ({
  useDialog: jest.fn(),
  useSnackbar: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('useCategories', () => {
  const mockNavigate = jest.fn();
  const mockShowSnackbar = jest.fn();
  const mockOpenDialog = jest.fn();
  const mockCloseDialog = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSnackbar as jest.Mock).mockReturnValue({ showSnackbar: mockShowSnackbar });
    (useDialog as jest.Mock).mockReturnValue({
      openDialog: mockOpenDialog,
      closeDialog: mockCloseDialog,
    });
  });

  it('should add and save new category', () => {
    const { result } = renderHook(() => useCategories());

    act(() => {
      result.current.handleAddCategory();
    });

    const newCategory = result.current.categories[result.current.categories.length - 1];
    expect(newCategory.name).toBe('');
    expect(newCategory.subCategories).toEqual([]);

    act(() => {
      result.current.handleSaveCategory({
        ...newCategory,
        name: 'Test Category',
      });
    });

    const savedCategory = result.current.categories[result.current.categories.length - 1];
    expect(savedCategory.name).toBe('Test Category');
  });

  it('should update existing category', () => {
    const { result } = renderHook(() => useCategories());

    act(() => {
      result.current.handleAddCategory();
    });

    const addedCategory = result.current.categories[result.current.categories.length - 1];

    act(() => {
      result.current.handleEditCategory(addedCategory);
      result.current.handleSaveCategory({
        ...addedCategory,
        name: 'Updated Category',
      });
    });

    const updatedCategory = result.current.categories.find(
      (currentCategory) => currentCategory.id === addedCategory.id
    );
    expect(updatedCategory?.name).toBe('Updated Category');
  });

  it('should delete category', () => {
    const { result } = renderHook(() => useCategories());
    const categoryToDelete = {
      id: 1,
      name: 'Category to Delete',
      subCategories: [],
    };

    act(() => {
      result.current.handleDeleteCategory(categoryToDelete.id);
    });

    expect(result.current.categories).not.toContainEqual(categoryToDelete);
  });

  it('should save changes', () => {
    const { result } = renderHook(() => useCategories());
    const consoleSpy = jest.spyOn(console, 'log');

    act(() => {
      result.current.handleSaveChanges();
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(mockShowSnackbar).toHaveBeenCalledWith({
      message: 'Изменения успешно сохранены',
    });
  });
});
