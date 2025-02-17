import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../index';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFound', () => {
  it('renders 404 page content', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    expect(
      screen.getByText('Запрашиваемая страница не существует или была удалена')
    ).toBeInTheDocument();
  });

  it('navigates to home page when button is clicked', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Вернуться на главную'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
