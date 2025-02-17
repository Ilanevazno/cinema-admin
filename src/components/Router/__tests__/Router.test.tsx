import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from '../index';

const CategoriesComponent = () => <div>Categories Page</div>;
jest.mock('@pages/Categories', () => ({
  __esModule: true,
  default: CategoriesComponent,
}));

describe('RouterComponent', () => {
  it('renders Categories page', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Categories Page')).toBeInTheDocument();
  });
});
