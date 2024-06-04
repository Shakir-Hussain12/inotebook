import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NoteState from '../context/notes/noteState';
import store from '../Redux/store';
import Authenticate from '../pages/Authenticate';

describe('Authenticate Page', () => {
  test('renders Auth page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NoteState>
            <Authenticate />
          </NoteState>
        </BrowserRouter>
      </Provider>,
    );
    const buttonElement = screen.getByText(/Login/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
