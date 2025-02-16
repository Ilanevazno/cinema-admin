import { styled } from 'styled-components';
import { Box, Typography, Paper } from '@mui/material';

export const StyledForm = styled(Paper)`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const StyledSubCategoryContainer = styled(Paper)`
  margin: 20px 0;
  padding: 24px;
  background-color: #f8f9fa;
`;

export const StyledButtonContainer = styled(Box)`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const StyledHeader = styled(Typography)`
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

export const StyledSubCategoryHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
