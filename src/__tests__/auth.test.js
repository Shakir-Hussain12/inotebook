import {
  render, screen, fireEvent,
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

  describe('Login Tests', () => {
    it('form contains 2 input fields', () => {
      const emailField = screen.getByText(/Email/i);
      const passwordField = screen.getByText(/Password/i);
      expect(emailField && passwordField).toBeInTheDocument();
    });

    it('contains a login button', () => {
      const buttonElement = screen.getByText(/Login/i);
      expect(buttonElement).toBeInTheDocument();
    });

    it('has link to registration', () => {
      const buttonElement = screen.getByRole(('button'), { name: /register/i });
      expect(buttonElement).toBeInTheDocument();
    });

    it('checks if valid changes are made to email', () => {
      const emailField = screen.getByTestId('email');
      fireEvent.change(emailField, { target: { value: 'shakir@gmail.com' } });
      expect(emailField.value).toEqual('shakir@gmail.com');
    });

    it('checks if valid changes are made to password', () => {
      const passwordField = screen.getByTestId('password');
      fireEvent.change(passwordField, { target: { value: 'password' } });
      expect(passwordField.value).toEqual('password');
    });
  });

  describe('Registration Tests', () => {
    beforeEach(async () => {
      const toggleButton = screen.getByRole('button', { name: /register/i });
      fireEvent.click(toggleButton);
    });

    afterEach(() => {
      cleanup();
    });

    it('form contains 4 fields', async () => {
      const passwordField = screen.getByText(/Password/i);

      const inputField = await screen.findAllByRole('textbox');
      expect(inputField.length).toBe(3);
      expect(passwordField).toBeInTheDocument();
    });

    it('has register button and link to login', async () => {
      const buttonElement = await screen.findByRole(('button'), { name: /register/i });
      const loginLink = await screen.findByRole('button', { name: /login/i });
      expect(buttonElement && loginLink).toBeInTheDocument();
    });

    it('checks if valid changes are made to first name', async () => {
      const nameField = await screen.findByTestId('first-name');
      fireEvent.change(nameField, { target: { value: 'Shakir' } });
      expect(nameField.value).toEqual('Shakir');
    });

    it('checks if valid changes are made to last name', async () => {
      const nameField = await screen.findByTestId('last-name');
      fireEvent.change(nameField, { target: { value: 'Hussain' } });
      expect(nameField.value).toEqual('Hussain');
    });

    it('checks if valid changes are made to email', () => {
      const emailField = screen.getByTestId('email');
      fireEvent.change(emailField, { target: { value: 'shakir@gmail.com' } });
      expect(emailField.value).toEqual('shakir@gmail.com');
    });

    it('checks if valid changes are made to password', () => {
      const passwordField = screen.getByTestId('password');
      fireEvent.change(passwordField, { target: { value: 'password' } });
      expect(passwordField.value).toEqual('password');
    });
  });
});
