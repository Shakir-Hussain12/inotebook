import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
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

  it('shows form when clicked on Add a new Note button', async () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    await act(async () => {
      const formButton = screen.getByRole('button', { name: /Add a new Note/i });
      fireEvent.click(formButton);
    });

    const formElement = screen.getByTestId('noteForm');
    expect(formElement).toBeInTheDocument();
  });
});
