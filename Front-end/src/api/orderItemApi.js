// src/api/orderItemApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/order-item';

const orderItemApi = {
     // Lấy tất cả order items
     getAll: () => axios.get(API_URL),

     // Lấy order items theo ID
     getById: (id) => axios.get(`${API_URL}/${id}`),

     // Tạo mới order item
     create: (orderItem) =>
          axios.post(API_URL, orderItem, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Cập nhật order item theo ID
     update: (id, orderItem) =>
          axios.patch(`${API_URL}/${id}`, orderItem, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Xóa order item theo ID
     delete: (id) => axios.delete(`${API_URL}/${id}`),

     // Lấy tất cả items của một order
     getByOrder: (orderId) => axios.get(`${API_URL}/order/${orderId}`),
};

export default orderItemApi;