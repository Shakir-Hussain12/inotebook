import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

api.interceptors.response.use((response) => console.log(response),
  (error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized');
    }

    return Promise.reject(error);
  });

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  const newConfig = { ...config };

  if (token) {
    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return newConfig;
}, (error) => Promise.reject(error));

export default api;
