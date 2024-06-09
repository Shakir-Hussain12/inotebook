import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import NoteState from '../context/notes/noteState';
import NoteForm from '../components/NoteForm';

describe('Noteform Components', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders noteform', () => {
    const formElement = screen.getByTestId('noteForm');
    expect(formElement).toBeInTheDocument();
  });

  it('has 2 input elements', () => {
    const inputFields = screen.getAllByRole('textbox');
    expect(inputFields).toHaveLength(2);
  });

  it('has a select element', () => {
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('has a Save Button', () => {
    const selectElement = screen.getByRole('button', { name: /Save/i });
    expect(selectElement).toBeInTheDocument();
  });

  it('has a Cancel element', () => {
    const selectElement = screen.getByRole('button', { name: /Cancel/i });
    expect(selectElement).toBeInTheDocument();
  });
});
