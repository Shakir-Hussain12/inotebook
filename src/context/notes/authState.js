import { useState } from 'react';
import AuthContext from './authContext';

// eslint-disable-next-line react/prop-types
const AuthState = ({ children }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  return (
    <AuthContext.Provider value={{
      user, setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
