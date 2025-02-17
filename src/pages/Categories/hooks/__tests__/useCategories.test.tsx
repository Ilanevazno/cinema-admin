import { renderHook, act } from '@testing-library/react';
import { useCategories } from '../useCategories';
import { useDialog, useSnackbar } from '@providers';
import { useNavigate } from 'react-router-dom';

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

  it('should add new category', () => {
    const { result } = renderHook(() => useCategories());

    act(() => {
      result.current.handleAddCategory();
    });

    expect(result.current.editingCategory).toEqual({
      name: '',
      subCategories: [],
      id: null,
      tempId: expect.any(Number),
    });
  });

  it('should save new category', () => {
    const { result } = renderHook(() => useCategories());
    const newCategory = {
      name: 'Test Category',
      subCategories: [],
      id: null,
      tempId: Date.now(),
    };

    act(() => {
      result.current.handleSaveCategory(newCategory);
    });

    expect(result.current.categories).toContainEqual({
      ...newCategory,
      id: null,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/categories');
  });

  it('should update existing category', () => {
    const { result } = renderHook(() => useCategories());
    const existingCategory = {
      id: 1,
      name: 'Updated Category',
      subCategories: [],
    };

    act(() => {
      result.current.handleSaveCategory(existingCategory);
    });

    expect(result.current.categories).toContainEqual(existingCategory);
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

    expect(mockOpenDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Удаление категории',
        content: 'Вы уверены, что хотите удалить эту категорию?',
      })
    );

    const { onConfirm } = mockOpenDialog.mock.calls[0][0];
    act(() => {
      onConfirm();
    });

    expect(result.current.deletedCategories).toContainEqual({ id: '1' });
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
