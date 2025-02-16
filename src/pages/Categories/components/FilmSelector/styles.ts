import { styled } from 'styled-components';
import { Box } from '@mui/material';

export const StyledFilmList = styled(Box)`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const StyledUnselectedFilms = styled(Box)`
  margin-top: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 4px;
`;

export const StyledChipsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;
