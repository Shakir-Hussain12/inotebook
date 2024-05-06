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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Login = async (user) => {
    const newUser = {
      email: user.email,
      password: user.password,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', newUser);
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
