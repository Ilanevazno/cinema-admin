import { render, screen, fireEvent } from '@testing-library/react';
import { DialogProvider, useDialog } from '../dialogProvider';

const TestComponent = () => {
  const { openDialog } = useDialog();

  return (
    <button
      onClick={() =>
        openDialog({
          title: 'Test Dialog',
          content: 'Test Content',
          onConfirm: jest.fn(),
        })
      }
    >
      Open Dialog
    </button>
  );
};

describe('DialogProvider', () => {
  it('opens dialog when openDialog is called', () => {
    render(
      <DialogProvider>
        <TestComponent />
      </DialogProvider>
    );

    fireEvent.click(screen.getByText('Open Dialog'));

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
