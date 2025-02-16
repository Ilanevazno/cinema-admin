import { Film } from '@models';

export interface FilmSelectorProps {
  selectedFilmIds: number[];
  availableFilms: Film[];
  onAddFilm: (filmId: number) => void;
  onRemoveFilm: (filmId: number) => void;
}
