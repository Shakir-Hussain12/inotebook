import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import noteContext from '../context/notes/noteContext';
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import { fetchUser, fetchUsers, loginUser } from '../Redux/Auth/authActions';
import {
  addNote, deleteNote, fetchNotes, updateNote,
} from '../Redux/Note/noteActions';

const Home = () => {
  const context = useContext(noteContext);
  const { notes, activeForm, setactiveForm } = context;
  const id = '_id';
  const dispatch = useDispatch();

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

      <div className="flex flex-col mt-5">
        <button onClick={() => dispatch(fetchUsers())} type="button">GetUsers</button>
        <button type="button" onClick={() => dispatch(fetchUser())}>GetUser</button>
        <button type="button" onClick={() => dispatch(loginUser({ email: 'yehya1@gmail.com', password: '123456' }))}>CheckLogin</button>
        <button type="button">CheckRegister</button>
      </div>

      <div className="flex flex-col mt-5">
        <button onClick={() => dispatch(fetchNotes())} type="button">GetNotes</button>
        <button type="button" onClick={() => dispatch(addNote({ tag: 'General', title: 'Checking this tag', description: 'This is the check note description' }))}>AddNote</button>
        <button
          type="button"
          onClick={() => dispatch(updateNote({
            tag: 'General', title: 'Updated this(1)', description: 'Syke, it is updated now', _id: '663e74383791208e93e00395',
          }))}
        >
          UpdateNote
        </button>
        <button type="button" onClick={() => dispatch(deleteNote('663e74383791208e93e00395'))}>deleteNote</button>
      </div>
    </>
  );
};

export default Home;
