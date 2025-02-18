import { render, screen, act } from '@testing-library/react';
import { SnackbarProvider, useSnackbar } from '../index';

const TestComponent = () => {
  const { showSnackbar } = useSnackbar();

  return (
    <button
      onClick={() =>
        showSnackbar({
          message: 'Test Message',
          severity: 'success',
        })
      }
    >
      Show Snackbar
    </button>
  );
};

describe('SnackbarProvider', () => {
  it('shows snackbar when showSnackbar is called', () => {
    render(
      <SnackbarProvider>
        <TestComponent />
      </SnackbarProvider>
    );

    act(() => {
      screen.getByText('Show Snackbar').click();
    });

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});
