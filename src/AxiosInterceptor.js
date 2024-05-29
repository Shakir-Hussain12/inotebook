import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 400) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/refresh', { withCredentials: true });
        if (response.status === 200) {
          return api(error.config);
        }
      } catch (error) {
        localStorage.setItem('status', JSON.stringify(false));
        window.location.href = '/auth';
      }
    }

    return Promise.reject(error);
  },
);
export default api;
