import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import CategoryForm from '../index';
import { CategoriesProvider } from '@providers';

// Мокаем react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => jest.fn(),
}));

describe('CategoryForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/categories/create' });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <CategoriesProvider>{ui}</CategoriesProvider>
      </BrowserRouter>
    );
  };

  it('renders form for new category', async () => {
    await act(async () => {
      renderWithProviders(<CategoryForm />);
    });

    expect(screen.getByText('Создание категории')).toBeInTheDocument();
    expect(screen.getByLabelText('Название категории')).toBeInTheDocument();
    expect(screen.getByText('Добавить подкатегорию')).toBeInTheDocument();
  });

  it('renders form for editing category', async () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/categories/update/1' });

    await act(async () => {
      renderWithProviders(<CategoryForm />);
    });

    expect(screen.getByText('Редактирование категории')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    await act(async () => {
      renderWithProviders(<CategoryForm />);
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
      renderWithProviders(<CategoryForm />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Добавить подкатегорию'));
    });
    expect(screen.getByLabelText('Название подкатегории')).toBeInTheDocument();

    await act(async () => {
      const deleteButton = screen.getByTestId('DeleteIcon').parentElement;
      if (deleteButton) {
        fireEvent.click(deleteButton);
      }
    });
    expect(screen.queryByLabelText('Название подкатегории')).not.toBeInTheDocument();
  });
});
