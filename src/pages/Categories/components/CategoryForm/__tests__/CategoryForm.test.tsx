import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import CategoryForm from '../index';
import { Category, Film } from '@models';

const mockFilms: Film[] = [
  { id: 1, name: 'Film 1' },
  { id: 2, name: 'Film 2' },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/categories/create' });
  });

  const mockProps = {
    films: mockFilms,
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it('renders form for new category', async () => {
    await act(async () => {
      renderWithRouter(<CategoryForm {...mockProps} />);
    });

    expect(screen.getByText('Создание категории')).toBeInTheDocument();
    expect(screen.getByLabelText('Название категории')).toBeInTheDocument();
    expect(screen.getByText('Добавить подкатегорию')).toBeInTheDocument();
  });

  it('renders form for editing category', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/categories/update/1' });

    const category: Category = {
      id: 1,
      name: 'Test Category',
      subCategories: [{ id: 1, name: 'Sub 1', filmIds: [1] }],
    };

    await act(async () => {
      renderWithRouter(<CategoryForm {...mockProps} category={category} />);
    });

    expect(screen.getByText('Редактирование категории')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Sub 1')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    await act(async () => {
      renderWithRouter(<CategoryForm {...mockProps} />);
    });

    const submitButton = screen.getByRole('button', { name: 'Сохранить' });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Название категории обязательно')).toBeInTheDocument();
      expect(screen.getByText('Необходимо добавить хотя бы одну подкатегорию')).toBeInTheDocument();
    });
  });

  it('adds and removes subcategories', async () => {
    await act(async () => {
      renderWithRouter(<CategoryForm {...mockProps} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Добавить подкатегорию'));
    });
    expect(screen.getByLabelText('Название подкатегории')).toBeInTheDocument();

    await act(async () => {
      const deleteButton = screen.getByTestId('DeleteIcon').parentElement;
      fireEvent.click(deleteButton!);
    });
    expect(screen.queryByLabelText('Название подкатегории')).not.toBeInTheDocument();
  });
});
