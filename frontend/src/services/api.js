import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

api.defaults.headers.common['token'] = 'SEU_TOKEN_AQUI'; 

export default api;
