import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import noteContext from '../context/notes/noteContext';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { fetchNotes } from '../Redux/Note/noteActions';

const Home = () => {
  const dispatch = useDispatch();
  const context = useContext(noteContext);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  const { notes } = useSelector((state) => state.note);
  const { activeForm, setactiveForm } = context;
  const id = '_id';

  return (
    <>
      <Navbar />

      {
        !activeForm ? (
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 mt-1 float-end me-2"
            onClick={() => setactiveForm(true)}
          >
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

      <span className="relative flex justify-center mt-3 mb-3 mxs:mt-16">
        <div
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
        />

        <span className="relative z-10 bg-white uppercase text-2xl">My Notes</span>
      </span>
      <div className="grid md:grid-cols-2 gap-3 px-5">
        {
          notes.map((note) => (
            <NoteItem key={note[id]} data={note} />
          ))
        }
      </div>
    </>
  );
};

export default Home;
