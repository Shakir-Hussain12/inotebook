import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../pages/About';

describe('About Page', () => {
  test('renders About page', () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );
    const headerElement = screen.getByText(/About Page/i);
    expect(headerElement).toBeInTheDocument();
  });
});
