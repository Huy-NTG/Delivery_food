import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

const userApi = {
     // Lấy danh sách tất cả người dùng
     getAll: () => axios.get(API_URL),

     // Lấy thông tin người dùng theo ID
     getById: (id) => axios.get(`${API_URL}/${id}`),

     // Tạo mới người dùng
     create: (user) =>
          axios.post(API_URL, user, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Cập nhật người dùng theo ID
     update: (id, user) =>
          axios.patch(`${API_URL}/${id}`, user, {
               headers: { 'Content-Type': 'application/json' },
          }),

     // Xóa người dùng theo ID
     delete: (id) => axios.delete(`${API_URL}/${id}`),

     
};

export default userApi;
