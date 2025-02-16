import { ReactElement, useMemo, memo } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { FilmSelectorProps } from './interfaces';
import { StyledChipsContainer, StyledFilmList, StyledUnselectedFilms } from './styles';

const FilmSelector = ({
  selectedFilmIds,
  availableFilms,
  onAddFilm,
  onRemoveFilm,
}: FilmSelectorProps): ReactElement => {
  const selectedFilms = useMemo(
    () => availableFilms.filter((film) => selectedFilmIds.includes(film.id)),
    [availableFilms, selectedFilmIds]
  );

  const unselectedFilms = useMemo(
    () => availableFilms.filter((film) => !selectedFilmIds.includes(film.id)),
    [availableFilms, selectedFilmIds]
  );

  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Выбранные фильмы:
      </Typography>

      <StyledFilmList>
        {selectedFilms.map((film) => (
          <Chip
            key={film.id}
            label={film.name}
            onDelete={() => onRemoveFilm(film.id)}
            color="primary"
            variant="outlined"
          />
        ))}
      </StyledFilmList>

      {unselectedFilms.length > 0 && (
        <StyledUnselectedFilms>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Добавить фильм:
          </Typography>
          <StyledChipsContainer>
            {unselectedFilms.map((film) => (
              <Chip
                key={film.id}
                label={film.name}
                onClick={() => onAddFilm(film.id)}
                color="default"
                variant="outlined"
                clickable
              />
            ))}
          </StyledChipsContainer>
        </StyledUnselectedFilms>
      )}
    </Box>
  );
};

export default memo(FilmSelector);
