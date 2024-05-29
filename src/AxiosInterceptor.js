import axios from 'axios';
// import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
});

api.interceptors.response.use(
  (response) => {
    console.log('Response was received');
    console.log(response.data);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 errors (unauthorized)
      console.error('Unauthorized access - redirecting to login');
      // You can perform a redirect to login page here or any other action
    }
    return Promise.reject(error);
  },
);
export default api;
