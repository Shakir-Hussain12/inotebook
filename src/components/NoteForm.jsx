import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import noteContext from '../context/notes/noteContext';
import { addNote } from '../Redux/Note/noteActions';

const NoteForm = () => {
  const context = useContext(noteContext);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('General');

  const { setactiveForm } = context;
  return (
    <form data-testid="noteForm">
      <div className="space-y-12 px-8 mb-6">
        <div className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-4">
          <div className="sm:col-span-full">
            <div className="flex flex-wrap justify-between gap-y-6">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 sm:min-w-99 xs:min-w-full">
                Title
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      data-testid="title"
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      defaultValue={title}
                      aria-label="Title Control"
                      required
                      minLength={5}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
              </label>

              <label htmlFor="Tag">
                <span className="text-lg">Type</span>
                <select
                  id="Tag"
                  name="Tag"
                  aria-label="Tag Control"
                  className="border rounded-lg ms-2 bg-slate-700 text-white"
                  required
                  defaultValue={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </label>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
              <div className="mt-2">
                <textarea
                  data-testid="description"
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={description}
                  required
                  minLength={10}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-b border-gray-900/10 pb-3">
          <button
            name="cancelButton"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setactiveForm(false)}
          >
            Cancel
          </button>
          <button
            name="saveFormButton"
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              dispatch(addNote({ title, description, tag }));
              setactiveForm(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
