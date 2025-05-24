import axios from 'axios';

const API_URL = 'http://localhost:3000/product';

const productApi = {
     getAll: () => {
          return axios.get(API_URL);
     },
     getAllProducts: (page = 1, limit = 100) => {
          return axios.get(API_URL, {
               params: { page, limit }
          });
     },

     getPaginated: (page = 1, limit = 10) => {
          return axios.get(`${API_URL}?page=${page}&limit=${limit}`);
     },

     getById: (id) => {
          return axios.get(`${API_URL}/${id}`);
     },

     create: (product) => {
          const formData = new FormData();
          formData.append('name', product.name);
          formData.append('quantity', product.quantity);
          formData.append('price', product.price);
          formData.append('category', product.category);
          if (product.image) {
               formData.append('image', product.image);
          }

          return axios.post(API_URL, formData, {
               // headers: {
               //      'Content-Type': 'multipart/form-data',
               // },
          });
     },

     update: (id, product) => {
          const formData = new FormData();
          formData.append('name', product.name);
          formData.append('quantity', product.quantity);
          formData.append('price', product.price);
          formData.append('category', product.category);
          if (product.image) {
               formData.append('image', product.image);
          }

          return axios.patch(`${API_URL}/${id}`, formData, {
               headers: {
                    'Content-Type': 'multipart/form-data',
               },
          });
     },


     delete: (id) => {
          return axios.delete(`${API_URL}/${id}`);
     },
};

export default productApi;
