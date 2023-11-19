// api.js
import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://apitesteip4y-backend-b3oi9qv4d-guilherme-alaminos-projects.vercel.app/api/teste.ip4y',
});

export default Api;
