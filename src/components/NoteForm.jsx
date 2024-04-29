/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteForm = () => {
  const context = useContext(noteContext);
  const { setactiveForm } = context;
  return (
    <form>
      <div className="space-y-12 px-6 mb-6">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  defaultValue=""
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue=""
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-b border-gray-900/10 pb-3">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => setactiveForm(false)}>
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
