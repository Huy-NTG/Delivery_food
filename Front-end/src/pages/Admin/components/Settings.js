import React, { useState } from 'react';
import './Settings.scss';

function Settings() {
    const [settings, setSettings] = useState({
        storeName: 'Nhà hàng ABC',
        address: '123 Đường ABC, Quận XYZ, TP.HCM',
        phone: '0123456789',
        email: 'contact@example.com',
        currency: 'VND',
        taxRate: 10,
        timezone: 'Asia/Ho_Chi_Minh',
        notifications: {
            email: true,
            sms: false,
            push: true,
        },
        theme: 'light',
        language: 'vi',
    });

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleNotificationChange = (type) => {
        setSettings((prev) => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: !prev.notifications[type],
            },
        }));
    };

    return (
        <div className="settings">
            <div className="settings-section">
                <h2>Thông tin cửa hàng</h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label>Tên cửa hàng</label>
                        <input
                            type="text"
                            value={settings.storeName}
                            onChange={(e) => handleSettingChange('storeName', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Địa chỉ</label>
                        <input
                            type="text"
                            value={settings.address}
                            onChange={(e) => handleSettingChange('address', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Số điện thoại</label>
                        <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => handleSettingChange('phone', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => handleSettingChange('email', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Cài đặt hệ thống</h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label>Đơn vị tiền tệ</label>
                        <select
                            value={settings.currency}
                            onChange={(e) => handleSettingChange('currency', e.target.value)}
                        >
                            <option value="VND">VND (Việt Nam Đồng)</option>
                            <option value="USD">USD (US Dollar)</option>
                            <option value="EUR">EUR (Euro)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Thuế VAT (%)</label>
                        <input
                            type="number"
                            value={settings.taxRate}
                            onChange={(e) => handleSettingChange('taxRate', Number(e.target.value))}
                            min="0"
                            max="100"
                        />
                    </div>
                    <div className="form-group">
                        <label>Múi giờ</label>
                        <select
                            value={settings.timezone}
                            onChange={(e) => handleSettingChange('timezone', e.target.value)}
                        >
                            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh (GMT+7)</option>
                            <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                            <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Thông báo</h2>
                <div className="settings-form">
                    <div className="notification-settings">
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={settings.notifications.email}
                                onChange={() => handleNotificationChange('email')}
                            />
                            <span className="toggle-text">Thông báo qua Email</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={settings.notifications.sms}
                                onChange={() => handleNotificationChange('sms')}
                            />
                            <span className="toggle-text">Thông báo qua SMS</span>
                        </label>
                        <label className="toggle-label">
                            <input
                                type="checkbox"
                                checked={settings.notifications.push}
                                onChange={() => handleNotificationChange('push')}
                            />
                            <span className="toggle-text">Thông báo đẩy</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Giao diện</h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label>Chủ đề</label>
                        <select value={settings.theme} onChange={(e) => handleSettingChange('theme', e.target.value)}>
                            <option value="light">Sáng</option>
                            <option value="dark">Tối</option>
                            <option value="system">Theo hệ thống</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Ngôn ngữ</label>
                        <select
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                        >
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="settings-actions">
                <button className="save-btn">Lưu thay đổi</button>
                <button className="reset-btn">Đặt lại</button>
            </div>
        </div>
    );
}

export default Settings;
