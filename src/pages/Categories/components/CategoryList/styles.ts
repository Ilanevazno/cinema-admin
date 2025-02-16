import { styled } from 'styled-components';
import { Box, Button, Paper } from '@mui/material';

export const StyledCategoryContainer = styled(Paper)`
  margin: 20px 0;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledCategoryHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;

export const StyledSubCategoryContainer = styled(Box)`
  margin: 12px 0 12px 20px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

export const StyledFilmContainer = styled(Box)`
  margin: 8px 0 8px 40px;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const StyledButton = styled(Button)`
  margin-bottom: 24px;
`;

export const StyledButtonContainer = styled(Box)`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;
