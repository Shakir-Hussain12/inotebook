import { useState, useEffect } from 'react';
import NoteContext from './noteContext';

// eslint-disable-next-line react/prop-types
const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeForm, setactiveForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxNDI5MzA4NX0.nbxQqBMvi_5jbM6u5ntoiG5vKVG64sqOZz8tumuZbLo',
      },
    }).then((response) => response.json()).then((data) => setNotes(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <NoteContext.Provider value={{
      notes, setNotes, activeForm, setactiveForm,
    }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
