// api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://10.0.2.2:8001/api/teste.ip4y',
});

export default Api;
