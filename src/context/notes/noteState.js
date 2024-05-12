import { useState } from 'react';
import NoteContext from './noteContext';

// eslint-disable-next-line react/prop-types
const NoteState = ({ children }) => {
  const [activeForm, setactiveForm] = useState(false);
  return (
    <NoteContext.Provider value={{
      activeForm,
      setactiveForm,
    }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
