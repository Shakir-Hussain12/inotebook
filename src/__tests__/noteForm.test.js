import {
  cleanup, render, screen, fireEvent,
} from '@testing-library/react';
import { toBeOneOf } from 'jest-extended';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../Redux/store';
import NoteState from '../context/notes/noteState';
import NoteForm from '../components/NoteForm';

expect.extend({ toBeOneOf });
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

  it('checks if valid changes are made to title', () => {
    const titleInput = screen.getByTestId('title');
    fireEvent.change(titleInput, { target: { value: 'note title' } });
    expect(titleInput.value).toEqual('note title');
  });

  it('checks if valid changes are made to description', () => {
    const descriptionInput = screen.getByTestId('description');
    fireEvent.change(descriptionInput, { target: { value: 'note description' } });
    expect(descriptionInput.value).toEqual('note description');
  });

  it('has a select element', () => {
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('check for valid value in select element', () => {
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Work' } });
    expect(selectElement.value).toBeOneOf(['Personal', 'General', 'Work']);
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
