import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';

import './Admin.scss';

// Import admin components
import RevenueStats from './components/RevenueStats';
import ProductManagement from './components/ProductManagement';
import OrderManagement from './components/OrderManagement';
import AccountManagement from './components/AccountManagement';
import Settings from './components/Settings';

function Admin() {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: 'bar_chart', label: 'Thống kê doanh thu' },
        { path: '/admin/products', icon: 'inventory_2', label: 'Quản lý sản phẩm' },
        { path: '/admin/orders', icon: 'shopping_cart', label: 'Quản lý đơn hàng' },
        { path: '/admin/accounts', icon: 'people', label: 'Quản lý tài khoản' },
        { path: '/admin/settings', icon: 'settings', label: 'Cài đặt' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div style={{ flex: 1 }}></div>
                <button className="logout-btn" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                    <span>Đăng xuất</span>
                </button>
            </div>

            <div className="admin-content">
                <div className="content-header">
                    <h1>{menuItems.find((item) => item.path === location.pathname)?.label || 'Dashboard'}</h1>
                    <div className="header-actions">
                        <button className="notification-btn">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <div className="admin-profile">
                            <span className="material-symbols-outlined">person</span>
                            <span>Admin</span>
                        </div>
                    </div>
                </div>

                <div className="content-body">
                    <Routes>
                        <Route index element={<RevenueStats />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="accounts" element={<AccountManagement />} />
                        <Route path="settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;
