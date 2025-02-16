import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@shared';
import { DialogProvider, SnackbarProvider } from '@providers';
import RouterComponent from '@components/Router';

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <SnackbarProvider>
          <DialogProvider>
            <RouterComponent />
          </DialogProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
