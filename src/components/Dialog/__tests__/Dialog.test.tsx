import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../index';

describe('Dialog', () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Test Title',
    content: 'Test Content',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
  };

  it('renders dialog with correct content', () => {
    render(<Dialog {...mockProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<Dialog {...mockProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when confirm button is clicked', () => {
    render(<Dialog {...mockProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockProps.onConfirm).toHaveBeenCalled();
  });

  it('uses default texts when not provided', () => {
    const { onClose, onConfirm, open } = mockProps;
    render(<Dialog open={open} onClose={onClose} onConfirm={onConfirm} />);

    expect(screen.getByText('Подтверждение')).toBeInTheDocument();
    expect(screen.getByText('Вы уверены?')).toBeInTheDocument();
    expect(screen.getByText('Подтвердить')).toBeInTheDocument();
    expect(screen.getByText('Отмена')).toBeInTheDocument();
  });
});
