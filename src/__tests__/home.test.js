import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import NoteState from '../context/notes/noteState';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('renders Home page', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const spanElement = screen.getByText(/My Notes/i);
    expect(spanElement).toBeInTheDocument();
  });
});
