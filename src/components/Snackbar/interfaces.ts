import { AlertProps, SnackbarProps as SnackbarPropsMui } from '@mui/material';

export interface SnackbarProps extends Pick<SnackbarPropsMui, 'open' | 'message'> {
  severity: AlertProps['severity'];
  onClose: () => void;
}
