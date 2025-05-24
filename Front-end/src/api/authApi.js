import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

const authApi = {
     register: (user) =>
          axios.post(`${API_URL}/register`, user, {
               headers: { 'Content-Type': 'application/json' },
          }),


     login: (credentials) =>
          axios.post(`${API_URL}/login`, credentials, {
               headers: { 'Content-Type': 'application/json' },
          }),
};

export default authApi;
