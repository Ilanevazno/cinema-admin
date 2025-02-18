import {
  createContext,
  useContext,
  ReactElement,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import Snackbar from '../components/Snackbar';

interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
}

interface SnackbarOptions {
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
}

const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

export const useSnackbar = () => useContext(SnackbarContext);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions>({ message: '' });

  const showSnackbar = useCallback((snackbarOptions: SnackbarOptions) => {
    setOptions(snackbarOptions);
    setIsOpen(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
    }),
    [showSnackbar, hideSnackbar]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={isOpen}
        onClose={hideSnackbar}
        message={options.message}
        severity={options.severity || 'success'}
      />
    </SnackbarContext.Provider>
  );
};
