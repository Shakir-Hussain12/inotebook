import {
  cleanup, fireEvent, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import api from '../../AxiosInterceptor';
import store from '../../Redux/store';
import NoteState from '../../context/notes/noteState';
import Home from '../../pages/Home';

describe('Home Page', () => {
  describe('Unit Tests', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <NoteState>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </NoteState>
        </Provider>,
      );
    });

    afterEach(() => {
      cleanup();
    });

    it('renders Home page', () => {
      const spanElement = screen.getByText(/My Notes/i);
      expect(spanElement).toBeInTheDocument();
    });

    it('contains a button with text Add a Note', () => {
      const buttonElement = screen.getByRole('button', { name: /Add a new Note/i });
      expect(buttonElement).toBeInTheDocument();
    });

    it('shows form when clicked on Add a new Note button', async () => {
      const formButton = screen.getByRole('button', { name: /Add a new Note/i });
      fireEvent.click(formButton);

      const formElement = await screen.findByTestId('noteForm');
      expect(formElement).toBeInTheDocument();
    });
  });

  describe('Note Item Integration Tests', () => {
    const renderFunc = () => {
      render(
        <Provider store={store}>
          <NoteState>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </NoteState>
        </Provider>,
      );
    };

    it('renders the note item component', async () => {
      jest.spyOn(api, 'get').mockResolvedValueOnce({
        data: [
          {
            _id: '1',
            title: 'Very First Note',
            description: 'Description of Note 1',
            tag: 'General',
          },
          {
            _id: '2',
            title: 'Second Note',
            description: 'Description of Note 2',
            tag: 'Specific',
          },
        ],
      });

      renderFunc();

      const noteItem = await screen.findByText(/Description of note 1/i);
      expect(noteItem).toBeInTheDocument();

      cleanup();
    });

    it('renders the error message when no notes are found', async () => {
      jest.spyOn(api, 'get').mockRejectedValueOnce({
        message: 'No Notes Found',
      });

      renderFunc();

      const noteElement = await screen.queryByTestId('noteItem');
      expect(noteElement).toBeNull();

      cleanup();
    });
  });
});
