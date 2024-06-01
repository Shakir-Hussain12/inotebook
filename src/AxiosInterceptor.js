/* eslint-disable no-alert */
import axios from 'axios';
import logoutUser from './Redux/Auth/logoutUser';

let visited = false;
const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401 && !visited) {
      visited = true;
      window.alert(`${error.response.statusText}, Logging Out`);
      await logoutUser();
    } if (error.response && error.response.status === 400) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/refresh', { withCredentials: true });
        if (response.status === 200) {
          return api(error.config);
        }
      } catch (error) {
        if (!visited) {
          visited = true;
          window.alert('Session Expired, Logging Out');
        }
        await logoutUser();
      }
    }

    return Promise.reject(error);
  },
);
export default api;
