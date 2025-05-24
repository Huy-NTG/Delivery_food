// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Sử dụng Link của React Router để chuyển trang
// import styles from './Login.module.scss';
// import images from '~/assets/images';
// import { login } from '../../services/authService';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [remember, setRemember] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             const data = await login({ email, password });
//             localStorage.setItem('token', data.access_token);
//             localStorage.setItem('username', data.username); // Lấy từ backend trả về
//             localStorage.setItem('role', data.role); // Lưu role
//             alert('Đăng nhập thành công!');
//             if (data.role === 'admin') {
//                 navigate('/admin');
//             } else {
//                 navigate('/');
//             }
//         } catch (err) {
//             setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
//         }
//     };

//     return (
//         <div className={styles.loginForm}>
//             <h2>Login</h2>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             <form onSubmit={handleSubmit}>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         id="email"
//                         className={styles.input}
//                         placeholder="Nhập email..."
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         className={styles.input}
//                         placeholder="Nhập mật khẩu..."
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>

//                 <div className={styles.rememberForgot}>
//                     <div className={styles.checkboxContainer}>
//                         <input
//                             type="checkbox"
//                             id="remember"
//                             checked={remember}
//                             onChange={(e) => setRemember(e.target.checked)}
//                         />
//                         <label htmlFor="remember">Remember me</label>
//                     </div>
//                     <a href="#!" className={styles.forgotLink}>
//                         Forgot Password?
//                     </a>
//                 </div>

//                 <button type="submit" className={styles.loginButton}>
//                     Login
//                 </button>

//                 <div className={styles.divider}>or</div>

//                 <div className={styles.socialLogin}>
//                     <button type="button" className={styles.facebookBtn}>
//                         <img src={images.facebook} alt="Facebook " className={styles.iconBtn} />

//                         <span className={styles.textFacebook}> Facebook </span>
//                     </button>
//                     <button type="button" className={styles.googleBtn}>
//                         <img src={images.google} alt="Google " className={styles.iconBtn} />
//                         <span className={styles.textGoogle}> Google </span>
//                     </button>
//                 </div>
//             </form>

//             <div className={styles.switch}>
//                 <span>Bạn chưa có tài khoản? </span>
//                 {/* Dùng Link để chuyển sang trang Signup */}
//                 <Link to="/signup">Sign Up</Link>
//             </div>
//         </div>
//     );
// }

// export default Login;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '~/api/authApi';
import images from '~/assets/images';
import styles from './Login.module.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await authApi.login({ email, password });
            const res = data.data;
            // Lưu thông tin người dùng
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('role', res.user.role);
            localStorage.setItem('username',res.user.username);

            alert('Đăng nhập thành công!');

            // Điều hướng theo role
            if (res.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
        }
    };

    return (
        <div className={styles.loginForm}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="Nhập email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                    />
                </div>

                <div className={styles.rememberForgot}>
                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#!" className={styles.forgotLink}>
                        Forgot Password?
                    </a>
                </div>

                <button type="submit" className={styles.loginButton}>
                    Login
                </button>

                <div className={styles.divider}>or</div>

                <div className={styles.socialLogin}>
                    <button type="button" className={styles.facebookBtn}>
                        <img src={images.facebook} alt="Facebook " className={styles.iconBtn} />
                        <span className={styles.textFacebook}> Facebook </span>
                    </button>
                    <button type="button" className={styles.googleBtn}>
                        <img src={images.google} alt="Google " className={styles.iconBtn} />
                        <span className={styles.textGoogle}> Google </span>
                    </button>
                </div>
            </form>

            <div className={styles.switch}>
                <span>Bạn chưa có tài khoản? </span>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
