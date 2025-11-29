import axios from 'axios';
import API_URL from '../config/api';

const api = axios.create({
  baseURL: API_URL,
});

api.defaults.headers.common['token'] = 'SEU_TOKEN_AQUI';

export default api;
