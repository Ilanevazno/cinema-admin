import { styled } from 'styled-components';
import { Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const StyledContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 24px;
  text-align: center;
`;

export const StyledIcon = styled(ErrorOutlineIcon)`
  font-size: 120px;
  color: #1976d2;
  margin-bottom: 24px;
`;
