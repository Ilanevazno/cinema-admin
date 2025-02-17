import { ReactElement } from 'react';
import { Snackbar as SnackbarMui, Alert } from '@mui/material';
import { SnackbarProps } from './interfaces';

const Snackbar = ({ open, onClose, message, severity }: SnackbarProps): ReactElement => {
  return (
    <SnackbarMui
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </SnackbarMui>
  );
};

export default Snackbar;
