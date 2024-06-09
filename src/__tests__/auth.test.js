import {
  render, screen, act, fireEvent,
  cleanup,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NoteState from '../context/notes/noteState';
import store from '../Redux/store';
import Authenticate from '../pages/Authenticate';

describe('Authenticate Page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NoteState>
            <Authenticate />
          </NoteState>
        </BrowserRouter>
      </Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders Auth page', () => {
    const headerElement = screen.getByRole('heading');
    expect(headerElement).toBeInTheDocument();
  });

  it('contains a description', () => {
    const spanElement = screen.getByText(/Your personal Notebook/i);
    expect(spanElement).toBeInTheDocument();
  });

  it('form contains 2 input fields if logging in', () => {
    const emailField = screen.getByText(/Email/i);
    const passwordField = screen.getByText(/Password/i);
    expect(emailField && passwordField).toBeInTheDocument();
  });

  it('form contains 4 fields if registering', async () => {
    const passwordField = screen.getByText(/Password/i);

    await act(async () => {
      const toggleButton = screen.getByRole('button', { name: /register/i });
      fireEvent.click(toggleButton);
    });

    const inputField = screen.getAllByRole('textbox');
    expect(inputField.length).toBe(3);
    expect(passwordField).toBeInTheDocument();
  });

  it('contains a login button', () => {
    const buttonElement = screen.getByText(/Login/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('has button to registration', () => {
    const buttonElement = screen.getByRole(('button'), { name: /register/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('has register button and link to login if registering', async () => {
    await act(async () => {
      const toggleButton = screen.getByRole('button', { name: /register/i });
      fireEvent.click(toggleButton);
    });

    const buttonElement = screen.getByRole(('button'), { name: /register/i });
    const loginLink = screen.getByRole('button', { name: /login/i });
    expect(buttonElement && loginLink).toBeInTheDocument();
  });
});
