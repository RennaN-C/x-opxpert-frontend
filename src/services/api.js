// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // <-- ESSA LINHA É CRUCIAL!
});

export default api;