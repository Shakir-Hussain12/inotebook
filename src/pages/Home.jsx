import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import noteContext from '../context/notes/noteContext';

const Home = () => {
  const context = useContext(noteContext);
  const { notes } = context;
  const id = '_id';
  return (
    <>
      <Navbar />
      <h1>Add a new Note</h1>
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
