import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import NoteState from '../context/notes/noteState';
import NoteForm from '../components/NoteForm';

describe('Noteform Components', () => {
  it('renders noteform', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const formElement = screen.getByTestId('noteForm');
    expect(formElement).toBeInTheDocument();
  });

  it('has 2 input elements', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const inputFields = screen.getAllByRole('textbox');
    expect(inputFields).toHaveLength(2);
  });

  it('has a select element', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('has a Save Button', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const selectElement = screen.getByRole('button', { name: /Save/i });
    expect(selectElement).toBeInTheDocument();
  });

  it('has a Cancel element', () => {
    render(
      <Provider store={store}>
        <NoteState>
          <BrowserRouter>
            <NoteForm />
          </BrowserRouter>
        </NoteState>
      </Provider>,
    );
    const selectElement = screen.getByRole('button', { name: /Cancel/i });
    expect(selectElement).toBeInTheDocument();
  });
});
