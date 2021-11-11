import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/' });

//API.interceptors.request.use((req) => {
//  if (localStorage.getItem('profile')) {
//    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//  }

// return req;
//});

export const getProjects = () => API.get('/projects');

//export const signIn = (formData) => API.post('/users/signin', formData);