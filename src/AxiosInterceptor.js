// import axios from 'axios';
// import Cookies from 'js-cookie';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/',
// });

// api.interceptors.request.use((config) => {
//   const token = Cookies.get('token');
//   const newConfig = { ...config };

//   if (token) {
//     newConfig.headers = {
//       ...newConfig.headers,
//       Authorization: `Bearer ${token}`,
//     };
//   }

//   return newConfig;
// }, (error) => Promise.reject(error));

// export default api;
