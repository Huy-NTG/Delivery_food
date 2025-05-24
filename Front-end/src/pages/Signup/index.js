import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Dùng Link để chuyển trang
import styles from './Signup.module.scss';
import axios from 'axios';
// import { signup } from '../../services/authService';
import authApi from '~/api/authApi';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [user, setUser]= useState([]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // await signup({ username, email, password });
            const userre = {
                username,
                email,
                password,
                sdt: '',
                role: '',
                status: 'active',
                lastLogin: new Date(),
            };
            setUser(userre);
            // await authApi.register(user);
            const response = await axios.post('http://localhost:3000/user', userre);
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (err) {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className={styles.signupForm}>
            <h2>Sign Up</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSignup}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">User name</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.input}
                        placeholder="Nhập tên đăng nhập..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="Nhập email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className={styles.signupButton}>
                    Sign Up
                </button>
            </form>

            <div className={styles.switch}>
                <span>Bạn đã có tài khoản? </span>
                {/* Dùng Link để chuyển sang trang Login */}
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
