import axios from 'axios';

const API_URL = 'http://localhost:3000/order';

const orderApi = {
     getAll: () => {
          return axios.get(API_URL);
     },

     getById: (id) => {
          return axios.get(`${API_URL}/${id}`);
     },

     create: (order) => {
          return axios.post(API_URL, order, {
               headers: {
                    'Content-Type': 'application/json',
               },
          });
     },

     update: (id, order) => {
          return axios.patch(`${API_URL}/${id}`, order, {
               headers: {
                    'Content-Type': 'application/json',
               },
          });
     },

     delete: (id) => {
          return axios.delete(`${API_URL}/${id}`);
     },
     changeStatus: (id, status) => {
          return axios.patch(`${API_URL}/${id}/status`, { status }, {
               headers: {
                    'Content-Type': 'application/json',
               },
          });
     },
};

export default orderApi;
