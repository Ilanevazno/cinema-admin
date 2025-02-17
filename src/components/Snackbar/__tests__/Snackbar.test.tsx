import { render, screen, cleanup } from '@testing-library/react';
import Snackbar from '../index';

describe('Snackbar', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    message: 'Test Message',
    severity: 'success' as const,
  };

  afterEach(() => {
    cleanup();
  });

  it('renders snackbar with message', () => {
    render(<Snackbar {...mockProps} />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders with different severities', () => {
    const severities = ['error', 'warning', 'info', 'success'] as const;

    severities.forEach((severity) => {
      cleanup();
      render(<Snackbar {...mockProps} severity={severity} />);
      expect(screen.getByRole('alert')).toHaveClass(
        `MuiAlert-filled${severity.charAt(0).toUpperCase() + severity.slice(1)}`
      );
    });
  });
});
