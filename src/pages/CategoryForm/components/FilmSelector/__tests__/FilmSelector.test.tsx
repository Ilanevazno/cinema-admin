import { render, screen, fireEvent } from '@testing-library/react';
import FilmSelector from '../index';
import { Film } from '@models';
import { act } from 'react';

describe('FilmSelector', () => {
  const mockFilms: Film[] = [
    { id: 1, name: 'Film 1' },
    { id: 2, name: 'Film 2' },
    { id: 3, name: 'Film 3' },
  ];

  const mockProps = {
    selectedFilmIds: [1],
    availableFilms: mockFilms,
    onAddFilm: jest.fn(),
    onRemoveFilm: jest.fn(),
  };

  it('renders selected and unselected films', () => {
    render(<FilmSelector {...mockProps} />);

    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
    expect(screen.getByText('Film 3')).toBeInTheDocument();
  });

  it('calls onAddFilm when unselected film is clicked', () => {
    render(<FilmSelector {...mockProps} />);

    fireEvent.click(screen.getByText('Film 2'));
    expect(mockProps.onAddFilm).toHaveBeenCalledWith(2);
  });

  it('calls onRemoveFilm when delete button is clicked', () => {
    render(<FilmSelector {...mockProps} />);

    act(() => {
      const deleteIcon = screen.getByTestId('CancelIcon');
      const deleteButton = deleteIcon.closest('.MuiChip-deleteIcon');
      fireEvent.click(deleteButton!);
    });

    expect(mockProps.onRemoveFilm).toHaveBeenCalledWith(1);
  });
});
