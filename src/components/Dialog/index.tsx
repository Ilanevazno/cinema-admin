import { ReactElement } from 'react';
import {
  Dialog as DialogMui,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material';
import { DialogProps } from './interfaces';

const Dialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Подтверждение',
  content = 'Вы уверены?',
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
}: DialogProps): ReactElement => {
  return (
    <DialogMui open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </DialogMui>
  );
};

export default Dialog;
