
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './RevenueStats.scss';

function RevenueStats() {
    // Mock data
    // const stats = {
    //     totalRevenue: 1250000,
    //     totalOrders: 156,
    //     averageOrder: 8012,
    //     todayRevenue: 125000,
    //     todayOrders: 18,
    // };

    const recentOrders = [
        { id: 1, customer: 'Nguyễn Văn A', amount: 150000, status: 'completed', time: '10:30' },
        { id: 2, customer: 'Trần Thị B', amount: 85000, status: 'processing', time: '10:25' },
        { id: 3, customer: 'Lê Văn C', amount: 200000, status: 'completed', time: '10:20' },
    ];

    // Dữ liệu mẫu cho các món ăn
    const foodStats = [
        { name: 'Cơm gà', sold: 120 },
        { name: 'Phở bò', sold: 80 },
        { name: 'Bún chả', sold: 30 },
        { name: 'Trà sữa', sold: 150 },
        { name: 'Nước cam', sold: 0 },
    ];
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        // averageOrder: 0,
        // todayRevenue: 0,
        // todayOrders: 0,
      });
      useEffect(() => {
        const fetchStats = async () => {
          try {
            const [revenueRes, ordersRes] = await Promise.all([
              axios.get('http://localhost:3000/order/total'), // tổng doanh thu
              axios.get('http://localhost:3000/order/total-orders'), // tổng đơn hàng
            ]);
    
            setStats(prev => ({
              ...prev,
              totalRevenue: revenueRes.data,
              totalOrders: ordersRes.data,
            }));
          } catch (err) {
            console.error('Lỗi khi tải thống kê:', err);
          }
        };
    
        fetchStats();
      }, []);
    // Tìm món bán chạy nhất và bán không chạy nhất
    const bestSeller = foodStats.reduce((max, item) => (item.sold > max.sold ? item : max), foodStats[0]);
    const worstSeller = foodStats.reduce((min, item) => (item.sold < min.sold ? item : min), foodStats[0]);

    // Hàm helper cho badge trạng thái
    const getOrderStatus = (status) => {
        switch (status) {
            case 'completed':
                return { label: 'Hoàn thành', className: 'completed' };
            case 'processing':
                return { label: 'Đang xử lý', className: 'processing' };
            case 'pending':
                return { label: 'Chờ xử lý', className: 'pending' };
            case 'cancelled':
                return { label: 'Đã hủy', className: 'cancelled' };
            default:
                return { label: status, className: '' };
        }
    };

    return (
        <div className="revenue-stats">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <span className="material-symbols-outlined">payments</span>
                    </div>
                    <div className="stat-info">
                        <h3>Tổng doanh thu</h3>
                        <p className="stat-value">{stats.totalRevenue.toLocaleString('vi-VN')}đ</p>
                        <span className="stat-change positive">+12.5%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <div className="stat-info">
                        <h3>Tổng đơn hàng</h3>
                        <p className="stat-value">{stats.totalOrders}</p>
                        <span className="stat-change positive">+8.2%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <span className="material-symbols-outlined">trending_up</span>
                    </div>
                    <div className="stat-info">
                        <h3>Đơn hàng trung bình</h3>
                        {/* <p className="stat-value">{stats.averageOrder.toLocaleString('vi-VN')}đ</p> */}
                        <span className="stat-change positive">+5.3%</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <span className="material-symbols-outlined">today</span>
                    </div>
                    <div className="stat-info">
                        <h3>Doanh thu hôm nay</h3>
                        {/* <p className="stat-value">{stats.todayRevenue.toLocaleString('vi-VN')}đ</p> */}
                        <div className="stat-today-orders">
                            {/* Tổng đơn: <b>{stats.todayOrders}</b> */}
                        </div>
                        <span className="stat-change positive">+15.2%</span>
                    </div>
                </div>
            </div>

            <div className="food-stats-row">
                <div className="food-card best-seller">
                    <div className="food-title">Món bán chạy nhất</div>
                    <div className="food-name">{bestSeller.name}</div>
                    <div className="food-sold">
                        Đã bán: <b>{bestSeller.sold}</b>
                    </div>
                </div>
                <div className="food-card worst-seller">
                    <div className="food-title">Món bán không chạy</div>
                    <div className="food-name">{worstSeller.name}</div>
                    <div className="food-sold">
                        Đã bán: <b>{worstSeller.sold}</b>
                    </div>
                </div>
            </div>

            <div className="revenue-chart">
                <div className="chart-header">
                    <h2>Biểu đồ doanh thu</h2>
                    <div className="chart-filters">
                        <button className="active">Tuần</button>
                        <button>Tháng</button>
                        <button>Năm</button>
                    </div>
                </div>
                <div className="chart-placeholder">
                    {/* Placeholder for chart - In real app, use a chart library like Chart.js */}
                    <div className="mock-chart">
                        <div className="chart-bar" style={{ height: '60%' }}></div>
                        <div className="chart-bar" style={{ height: '80%' }}></div>
                        <div className="chart-bar" style={{ height: '40%' }}></div>
                        <div className="chart-bar" style={{ height: '90%' }}></div>
                        <div className="chart-bar" style={{ height: '70%' }}></div>
                        <div className="chart-bar" style={{ height: '50%' }}></div>
                        <div className="chart-bar" style={{ height: '85%' }}></div>
                    </div>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Đơn hàng gần đây</h2>
                <div className="orders-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Số tiền</th>
                                <th>Trạng thái</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => {
                                const status = getOrderStatus(order.status);
                                return (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.amount.toLocaleString('vi-VN')}đ</td>
                                        <td>
                                            <span className={`status-badge ${status.className}`}>{status.label}</span>
                                        </td>
                                        <td>{order.time}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RevenueStats;
