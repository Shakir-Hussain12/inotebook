import { useState } from 'react';
import axios from 'axios';
import AuthContext from './authContext';

// eslint-disable-next-line react/prop-types
const AuthState = ({ children }) => {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const Register = async (user) => {
    const newUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      password: user.password,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/createuser', newUser);
      return res.status(200).json({ message: 'User Registered' });
    } catch (error) {
      return error;
    }
  };

  const Login = async (user) => {
    const newUser = {
      email: user.email,
      password: user.password,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', newUser);
      window.location.href = '/';
      return res.data;
    } catch (error) {
      return error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user, setUser, Login, Register,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
