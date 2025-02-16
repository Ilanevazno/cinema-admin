import {
  createContext,
  useContext,
  ReactElement,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import Dialog from '../components/Dialog';

interface DialogContextType {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
}

interface DialogOptions {
  title?: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const DialogContext = createContext<DialogContextType>({} as DialogContextType);

export const useDialog = () => useContext(DialogContext);

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({});

  const openDialog = useCallback((dialogOptions: DialogOptions) => {
    setOptions(dialogOptions);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setOptions({});
  }, []);

  const handleConfirm = useCallback(() => {
    if (options.onConfirm) {
      options.onConfirm();
    }
    closeDialog();
  }, [options.onConfirm, closeDialog]);

  const contextValue = useMemo(
    () => ({
      openDialog,
      closeDialog,
    }),
    [openDialog, closeDialog]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        title={options.title}
        content={options.content}
        confirmText={options.confirmText}
        cancelText={options.cancelText}
      />
    </DialogContext.Provider>
  );
};
