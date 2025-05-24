import React from 'react';

function Profile() {
    const username = localStorage.getItem('username');
    // Có thể fetch thêm thông tin user từ backend nếu muốn
    return (
        <div style={{ padding: 32 }}>
            <h2>Thông tin cá nhân</h2>
            <p><b>Tên đăng nhập:</b> {username}</p>
            {/* Thêm các thông tin khác nếu có */}
        </div>
    );
}

export default Profile;