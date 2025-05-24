import axios from 'axios';

const API_URL = 'http://localhost:3000/customer';

const customerApi = {
     // Lấy tất cả customers
     getAll: () => axios.get(API_URL),

     // Lấy customer theo ID
     getById: (id) => axios.get(`${API_URL}/${id}`),

     // Tạo mới customer
     create: (customer) =>
          axios.post(API_URL, customer, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Cập nhật customer theo ID
     update: (id, customer) =>
          axios.patch(`${API_URL}/${id}`, customer, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Xóa customer theo ID
     delete: (id) => axios.delete(`${API_URL}/${id}`),
};

export default customerApi;
