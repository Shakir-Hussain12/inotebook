import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import noteContext from '../context/notes/noteContext';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxNDI5MzA4NX0.nbxQqBMvi_5jbM6u5ntoiG5vKVG64sqOZz8tumuZbLo',
  },
};

const Buttons = ({
  data: {
    _id, noteTag, noteTitle, noteDescription,
  }, inputRef,
}) => {
  const context = useContext(noteContext);

  const handleEdit = () => {
    context.setIsEditable(!context.isEditable);
    const newRef = { ...inputRef };
    newRef.current.disabled = false;
    inputRef.current.focus();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${_id}`, config);
      window.location.reload();
      return 1;
    } catch (error) {
      return error;
    }
  };

  const handleSave = async () => {
    const payload = {
      tag: noteTag,
      title: noteTitle,
      description: noteDescription,
    };

    try {
      await axios.put(`http://localhost:5000/api/notes/${_id}`, payload, config);
    } catch (error) {
      console.log(error);
    }

    context.setIsEditable(false);
    return 1;
  };

  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1 gap-x-4">
      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-blue-500 hover:text-gray-700 focus:relative ${context.isEditable ? 'hidden' : 'block'}`}
        onClick={() => handleEdit()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        Edit
      </button>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-red-500 shadow-sm focus:relative"
        onClick={() => handleDelete()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>

        Delete
      </button>

      <button
        type="submit"
        className={`inline-flex items-center gap-2 rounded-md bg-slate-800 text-green px-4 py-2 text-sm shadow-sm focus:relative ${context.isEditable ? 'block' : 'hidden'}`}
        onClick={() => handleSave()}
      >
        Save
      </button>
    </div>
  );
};

Buttons.propTypes = {
  data: PropTypes.shape({
    noteTag: PropTypes.string.isRequired,
    noteTitle: PropTypes.string.isRequired,
    noteDescription: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};

export default Buttons;
