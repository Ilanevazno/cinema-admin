import { Box, CircularProgress } from '@mui/material';
import type { ReactElement } from 'react';

const PageLoader = (): ReactElement => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    bgcolor="background.default"
  >
    <CircularProgress size={60} thickness={4} />
  </Box>
);

export default PageLoader;
