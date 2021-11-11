import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/' });

//API.interceptors.request.use((req) => {
//  if (localStorage.getItem('profile')) {
//    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//  }

// return req;
//});

export const getProjects = (id) => API.get('/projects/' + id);
export const getExpense = (id) => API.get('/expense/' + id)
export const addExpense = (proj_id, user_id) => API.get('/add_expense/' + proj_id + user_id)

//export const signIn = (formData) => API.post('/users/signin', formData);