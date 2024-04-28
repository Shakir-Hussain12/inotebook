import { useState } from 'react';
import NoteContext from './noteContext';

// eslint-disable-next-line react/prop-types
const NoteState = ({ children }) => {
  const [state, setstate] = useState({
    name: 'Shakir',
    age: 25,
  });

  const updateFunc = () => {
    setstate({
      name: 'Mushahid',
      age: 16,
    });
  };

  return (
    <NoteContext.Provider value={{ state, updateFunc }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
