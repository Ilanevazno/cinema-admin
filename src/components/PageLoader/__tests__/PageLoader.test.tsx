import { render, screen } from '@testing-library/react';
import PageLoader from '../index';

describe('PageLoader', () => {
  it('renders circular progress', () => {
    render(<PageLoader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    const { container } = render(<PageLoader />);
    const box = container.firstChild;

    expect(box).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    });
  });
});
