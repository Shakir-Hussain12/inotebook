import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import noteContext from '../context/notes/noteContext';
import NoteForm from '../components/NoteForm';

const Home = () => {
  const context = useContext(noteContext);
  const { notes, activeForm, setactiveForm } = context;
  const id = '_id';
  return (
    <>
      <Navbar />
      {
        !activeForm ? (
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 mt-1 float-end me-2" onClick={() => setactiveForm(true)}>
            Add a new Note
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        ) : null
      }
      {
        activeForm ? <NoteForm /> : null
      }
      <h3>My Notes</h3>
      {
          notes.map((note) => (
            <div className="noteitem" key={note[id]}>
              <div className="title">
                {note.title}
                {' '}
                <span className="tag">{note.tag}</span>
              </div>
              <div className="description">{note.description}</div>
            </div>
          ))
        }
    </>
  );
};

export default Home;
