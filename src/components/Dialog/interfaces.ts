import { DialogProps as DialogPropsMui } from '@mui/material';

export interface DialogProps extends Pick<DialogPropsMui, 'open'> {
  onConfirm: () => void;
  onClose: () => void;
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
}
