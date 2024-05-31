import axios from 'axios';

const logoutUser = async () => {
  try {
    localStorage.setItem('status', JSON.stringify(false));
    const res = await axios.get('http://localhost:5000/api/auth/logout');
    window.location.href = '/auth';
    return res;
  } catch (error) {
    return error;
  }
};

export default logoutUser;
