import { useState, useEffect } from 'react';
import axios from 'axios';
import NoteContext from './noteContext';

// eslint-disable-next-line react/prop-types
const NoteState = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [activeForm, setactiveForm] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxZjc1YjQ4NTViZTFjMDUzMmYyMDQ5In0sImlhdCI6MTcxNDI5MzA4NX0.nbxQqBMvi_5jbM6u5ntoiG5vKVG64sqOZz8tumuZbLo',
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes', config);
        setNotes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <NoteContext.Provider value={{
      notes, setNotes, activeForm, setactiveForm, isEditable, setIsEditable,
    }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
