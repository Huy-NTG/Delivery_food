import { useEffect, useState } from 'react';
import orderApi from '~/api/oderApi';
import productApi from '~/api/productApi';
import './OrderManagement.scss';

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    // const [price, setPrice] = useState();
    const [products, setProducts] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [newOrder, setNewOrder] = useState({
        customer: '',
        phone: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        paymentMethod: 'cod',
    });
    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await orderApi.getAll();
                // Map API response về đúng cấu trúc
                console.log(response.data);
                // const mapped = response.data.map(o => ({
                //     id: o.id,
                //     customer: customerApi.getById(o.customer.id),
                //     items: orderItemApi.getByOrder(o.id),
                //     total: o.total,
                //     status: o.status,
                //     createdAt: o.createAt,
                //     paymentMethod: o.paymentMethod,
                // }));
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchOrders();
    }, []);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await productApi.getAll();
                setProducts(response.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts();
    }, []);

    // Khi chọn sản phẩm trong modal tạo đơn hàng
    const handleSelectProduct = async (index, productId) => {
        try {
            const res = await productApi.getById(productId);
            const product = res.data;

            const updatedItems = [...newOrder.items];
            updatedItems[index] = {
                productId,
                name: product.name,
                quantity: 1,
                price: product.price,
            };

            setNewOrder({ ...newOrder, items: updatedItems });
        } catch (err) {
            console.error('Lỗi khi lấy sản phẩm:', err);
        }
    };


    const handleQuantityChange = (index, quantity) => {
        const updatedItems = [...newOrder.items];
        updatedItems[index].quantity = quantity;
        setNewOrder({ ...newOrder, items: updatedItems });
    };

    const addItemField = () => {
        setNewOrder({
            ...newOrder,
            items: [...newOrder.items, { productId: '', name: '', quantity: 1, price: 0 }],
        });
    };

    const removeItemField = (index) => {
        setNewOrder({
            ...newOrder,
            items: newOrder.items.filter((_, i) => i !== index),
        });
    };

    // Gửi tạo đơn hàng lên API
    const handleCreateOrder = () => {
        const total = newOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            customerName: newOrder.customer,
            customerPhone: newOrder.phone,
            items: newOrder.items.map(i => ({
                name: i.name,
                productId: i.productId,
                quantity: i.quantity,
                price: i.price,
            })),
            paymentMethod: newOrder.paymentMethod,
            status: 'pending',
            createAt: new Date().toLocaleString('vi-VN'),
            total: total,
        };
        console.log(orderData);
        orderApi.create(orderData)
            .then(res => {
                setOrders([...orders, res.data]);
                setShowCreateModal(false);
                setNewOrder({
                    customer: '',
                    phone: '',
                    items: [{ productId: '', name: '', quantity: 1, price: 0 }],
                    paymentMethod: 'cod',
                });
            })
            .catch(err => console.error(err));
        alert("Tạo đơn hàng thành công!");

    };


    // const handleStatusChange = (orderId, newStatus) => {
    //     setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
    //     orderApi.changeStatus(orderId,data);
    // };
    const handleStatusChange = (orderId, newStatus) => {
        orderApi.update(orderId, { status: newStatus })
            .then(res => {
                // cập nhật lại state orders
                setOrders(orders.map(o => o.id === orderId ? res.data : o));
            })
            .catch(err => console.error(err));
        alert("Cập nhật trạng thái thành công!")
    };

    const handleEditOrder = () => {
        const updatedOrders = orders.map((order) =>
            order.id === editingOrder.id
                ? {
                    ...editingOrder,
                    total: editingOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
                }
                : order,
        );
        setOrders(updatedOrders);
        setShowEditModal(false);
        setEditingOrder(null);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            setOrders(orders.filter((order) => order.id !== orderId));
        }
    };

    const startEditOrder = (order) => {
        setEditingOrder({ ...order });
        setShowEditModal(true);
    };
    const updateItemField = (index, field, value, isEdit = false) => {
        if (isEdit) {
            const updatedItems = [...editingOrder.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            setEditingOrder({ ...editingOrder, items: updatedItems });
        } else {
            const updatedItems = [...newOrder.items];
            updatedItems[index] = { ...updatedItems[index], [field]: value };
            setNewOrder({ ...newOrder, items: updatedItems });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ffa726';
            case 'processing':
                return '#29b6f6';
            case 'completed':
                return '#66bb6a';
            case 'cancelled':
                return '#ef5350';
            default:
                return '#666';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending':
                return 'Chờ xử lý';
            case 'processing':
                return 'Đang xử lý';
            case 'shipped':
                return 'Hoàn thành';
            case 'paid':
                return 'Đã hủy';
            default:
                return status;
        }
    };

    return (
        <div className="order-management">
            <div className="order-header">
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm đơn hàng..." />
                </div>
                <div className="filter-buttons">
                    <button className="active">Tất cả</button>
                    <button>Chờ xử lý</button>
                    <button>Đang xử lý</button>
                    <button>Hoàn thành</button>
                    <button>Đã hủy</button>
                </div>
                <button className="create-order-btn" onClick={() => setShowCreateModal(true)}>
                    <span className="material-symbols-outlined">add</span>
                    Tạo đơn hàng
                </button>
            </div>

            <div className="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Thanh toán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{order.customer.name}</td>
                                <td>{order.total.toLocaleString('vi-VN')}đ</td>
                                <td>
                                    <span
                                        className="status-badge"
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {getStatusText(order.status)}
                                    </span>
                                </td>
                                <td>
                                    {new Date(order.createdAt).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </td>
                                <td>
                                    {order.paymentMethod === 'cod'
                                        ? 'Tiền mặt'
                                        : order.paymentMethod === 'bank_transfer'
                                            ? 'Chuyển khoản'
                                            : order.paymentMethod === 'momo'
                                                ? 'Momo'
                                                : order.paymentMethod === 'vnpay'
                                                    ? 'VNPAY'
                                                    : 'Không xác định'}
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            style={{ backgroundColor: getStatusColor(order.status) }}
                                        >
                                            <option value="pending">Chờ xử lý</option>
                                            <option value="processing">Đang xử lý</option>
                                            <option value="shipped">Hoàn thành</option>
                                            <option value="paid">Đã hủy</option>
                                        </select>
                                        <button onClick={() => setSelectedOrder(order)}>
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                        <button onClick={() => startEditOrder(order)}>
                                            <span className="material-symbols-outlined">edit</span>
                                        </button>
                                        <button onClick={() => handleDeleteOrder(order.id)}>
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedOrder && (
                <div className="order-details-modal">
                    <div className="modal-content">
                        <h2>Chi tiết đơn hàng #{selectedOrder.id}</h2>
                        <div className="detail-row">
                            <span>Khách hàng:</span>
                            <span>{selectedOrder.customer.name}</span>
                        </div>
                        <div className="detail-row">
                            <span>Thời gian:</span>
                            <span>{selectedOrder.createdAt}</span>
                        </div>
                        <div className="detail-row">
                            <span>Phương thức thanh toán:</span>
                            <span>{selectedOrder.paymentMethod === 'cod'
                                ? 'Tiền mặt'
                                : selectedOrder.paymentMethod === 'bank_transfer'
                                    ? 'Chuyển khoản'
                                    : selectedOrder.paymentMethod === 'momo'
                                        ? 'Momo'
                                        : selectedOrder.paymentMethod === 'vnpay'
                                            ? 'VNPAY'
                                            : 'Không xác định'}</span>
                        </div>
                        <div className="items-list">
                            <h3>Danh sách sản phẩm</h3>
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="item-row">
                                    <span>{item.name}</span>
                                    <span>
                                        {item.quantity} x {item.price.toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            ))}
                            <div className="total-row">
                                <span>Tổng cộng:</span>
                                <span>{selectedOrder.total.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedOrder(null)}>Đóng</button>
                    </div>
                </div>
            )}

            {showCreateModal && (
                <div className="create-order-modal">
                    <div className="modal-content">
                        <h2>Tạo đơn hàng mới</h2>
                        <div className="form-group">
                            <label>Tên khách hàng:</label>
                            <input
                                type="text"
                                value={newOrder.customer}
                                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại:</label>
                            <input
                                type="text"
                                value={newOrder.phone}
                                onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phương thức thanh toán:</label>
                            <select
                                value={newOrder.paymentMethod}
                                onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                            >
                                <option value="cod">Tiền mặt</option>
                                <option value="momo">Chuyển khoản</option>
                                <option value="bank_transfer">Thẻ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sản phẩm:</label>
                            {newOrder.items.map((item, index) => (
                                <div key={index} className="item-input-group">
                                    {/* <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItemField(index, 'name', e.target.value)}
                                        placeholder="Tên sản phẩm"
                                    /> */}
                                    <select
                                        value={item.productId || ''}
                                        onChange={(e) => handleSelectProduct(index, e.target.value)}
                                    >
                                        <option value="">-- Chọn sản phẩm --</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min={1}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItemField(index, 'price', parseInt(e.target.value))}
                                        min="0"
                                        placeholder="Giá"
                                    />
                                    <button onClick={() => removeItemField(index)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button className="add-item-btn" onClick={() => addItemField()}>
                                <span className="material-symbols-outlined">add</span>
                                Thêm sản phẩm
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                                Hủy
                            </button>
                            <button className="create-btn" onClick={handleCreateOrder}>
                                Tạo đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            )}



            {showEditModal && editingOrder && (
                <div className="edit-order-modal">
                    <div className="modal-content">
                        <h2>Chỉnh sửa đơn hàng #{editingOrder.id}</h2>
                        <div className="form-group">
                            <label>Tên khách hàng:</label>
                            <input
                                type="text"
                                value={editingOrder.customer}
                                onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phương thức thanh toán:</label>
                            <select
                                value={editingOrder.paymentMethod}
                                onChange={(e) => setEditingOrder({ ...editingOrder, paymentMethod: e.target.value })}
                            >
                                <option value="cod">Tiền mặt</option>
                                <option value="momo">Chuyển khoản</option>
                                <option value="bank_transfer">Thẻ</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Trạng thái:</label>
                            <select
                                value={editingOrder.status}
                                onChange={(e) => setEditingOrder({ ...editingOrder, status: e.target.value })}
                            >
                                <option value="pending">Chờ xử lý</option>
                                <option value="processing">Đang xử lý</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sản phẩm:</label>
                            {editingOrder.items.map((item, index) => (
                                <div key={index} className="item-input-group">
                                    <input
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => updateItemField(index, 'name', e.target.value, true)}
                                        placeholder="Tên sản phẩm"
                                    />
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItemField(index, 'quantity', parseInt(e.target.value), true)
                                        }
                                        min="1"
                                        placeholder="Số lượng"
                                    />
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            updateItemField(index, 'price', parseInt(e.target.value), true)
                                        }
                                        min="0"
                                        placeholder="Giá"
                                    />
                                    <button onClick={() => removeItemField(index, true)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            ))}
                            <button className="add-item-btn" onClick={() => addItemField(true)}>
                                <span className="material-symbols-outlined">add</span>
                                Thêm sản phẩm
                            </button>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                                Hủy
                            </button>
                            <button className="save-btn" onClick={handleEditOrder}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderManagement;
