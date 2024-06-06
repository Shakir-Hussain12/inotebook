import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import NoteState from '../context/notes/noteState';
import Home from '../pages/Home';

describe('Home Page', () => {
  it('renders Home page', () => {
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

  it('contains a button with text Add a Note', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const buttonElement = screen.getByRole('button', { name: /Add a new Note/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
