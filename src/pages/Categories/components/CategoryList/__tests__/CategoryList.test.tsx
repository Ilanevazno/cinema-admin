import { render, screen, fireEvent } from '@testing-library/react';
import CategoryList from '../index';
import { Category, Film } from '@models';

describe('CategoryList', () => {
  const mockFilms: Film[] = [
    { id: 1, name: 'Film 1' },
    { id: 2, name: 'Film 2' },
  ];

  const mockCategories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      subCategories: [{ id: 11, name: 'SubCategory 1', filmIds: [1] }],
    },
  ];

  const mockProps = {
    categories: mockCategories,
    films: mockFilms,
    onEditCategory: jest.fn(),
    onAddCategory: jest.fn(),
    onDeleteCategory: jest.fn(),
    onSaveChanges: jest.fn(),
  };

  it('renders empty state correctly', () => {
    render(<CategoryList {...mockProps} categories={[]} />);
    expect(screen.getByText('Создайте первую категорию')).toBeInTheDocument();
  });

  it('renders categories with films', () => {
    render(<CategoryList {...mockProps} />);
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Film 1')).toBeInTheDocument();
  });

  it('calls onAddCategory when add button is clicked', () => {
    render(<CategoryList {...mockProps} />);
    fireEvent.click(screen.getByText('Добавить категорию'));
    expect(mockProps.onAddCategory).toHaveBeenCalled();
  });

  it('calls onEditCategory when edit button is clicked', () => {
    render(<CategoryList {...mockProps} />);
    fireEvent.click(screen.getByText('Редактировать'));
    expect(mockProps.onEditCategory).toHaveBeenCalledWith(mockCategories[0]);
  });

  it('calls onDeleteCategory when delete button is clicked', () => {
    render(<CategoryList {...mockProps} />);
    const deleteButton = screen.getByTestId('DeleteIcon').parentElement;
    fireEvent.click(deleteButton!);
    expect(mockProps.onDeleteCategory).toHaveBeenCalledWith(1);
  });

  it('calls onSaveChanges when save button is clicked', () => {
    render(<CategoryList {...mockProps} />);
    fireEvent.click(screen.getByText('Сохранить изменения'));
    expect(mockProps.onSaveChanges).toHaveBeenCalled();
  });
});
