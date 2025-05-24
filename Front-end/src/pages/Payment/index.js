import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orderApi from '~/api/oderApi';
import userApi from '~/api/userApi';
import { parseJwt } from '../../utils/jwt';
import './PaymentPage.scss';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const cartTotal = location.state?.cartTotal || 0;
  const userNamepay = localStorage.getItem('username');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [order, setOrder] = useState({
    customerName: '',
    customerPhone: '',
    items: [],
    paymentMethod: 'cod',
    status: 'pending',
    createAt: new Date().toLocaleString('vi-VN'),
    total: cartTotal.toFixed(0),
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để thanh toán!');
      navigate('/login');
    }
  }, [navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    const token = localStorage.getItem('token');
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const user = parseJwt(token);
    const simplifiedCart = cart.map(item => ({
      productId: item.id,
      quantity: item.qty,
      price: item.price,
    }));


    console.log('Token:', token);
    console.log('User (from token):', user);
    console.log('Cart:', cart);
    console.log('Simplified Cart:', simplifiedCart);

    if (!user) {
      alert('Token không hợp lệ hoặc đã hết hạn!');
      navigate('/login');
      return;
    }

    try {
      const currentUser = await userApi.getById(user.sub);
      console.log('Current user from API:', currentUser);

      const newOrder = {
        customerName: currentUser.data.username,
        customerPhone: currentUser.data.sdt,
        items: simplifiedCart,
        paymentMethod: paymentMethod,
        status: 'pending',
        createAt: new Date().toLocaleString('vi-VN'),
        total: cartTotal.toFixed(0),
      };

      console.log('✅ newOrder to send:', newOrder);
      setOrder(newOrder); // set state

      try {
        const res = await orderApi.create(newOrder);
        console.log('Order create response:', res);
        if (res.data && res.data.total !== 0) {
          alert('Đặt hàng thành công!');
          // Xử lý sau khi thành công
        } else {
          throw new Error('Tạo đơn hàng thất bại');
        }
      } catch (error) {
        console.error('Lỗi tạo đơn:', error.response ? error.response.data : error.message);
        alert('Tạo đơn hàng thất bại, vui lòng thử lại');
      }


      setTimeout(() => {
        setIsProcessing(false);
        setShowSuccess(true);
        localStorage.removeItem('cart');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }, 1500);
    } catch (err) {
      setIsProcessing(false);
      console.error('❌ Error:', err);
      alert(err.message);
    }
  };

  return (
    <div className="payment-container">
      {showSuccess && (
        <div className="payment-success-overlay">
          <div className="payment-success-message">
            <span className="material-symbols-outlined success-icon">check_circle</span>
            <h2>Payment Successful!</h2>
            <p>Thank you for your order</p>
          </div>
        </div>
      )}

      <div className="payment-header">
        <button className="payment-back" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span> Back
        </button>
        <div className="payment-title">PAYMENT</div>
        <div className="payment-breadcrumb">
          <span>Home</span>
          <span className="dot">•</span>
          <span className="active">Payment</span>
        </div>
      </div>

      <div className="payment-content">
        <div className="payment-box">
          <div className="payment-business">
            <img alt="Business Logo" className="payment-business-logo" />
            <span className="business-name">Business name</span>
            <div className="payment-amount-group">
              <span className="payment-amount">{cartTotal.toFixed(2)} NOK</span>
              <span className="payment-vat">inc. VAT</span>
            </div>
          </div>

          <div className="payment-testmode">Checkout is running in test mode. Click here for test data.</div>

          {/* Select payment method */}
          <div className="payment-method-select">
            <label htmlFor="payment-method">Chọn phương thức thanh toán:</label>
            <select
              id="payment-method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="payment-select"
            >
              <option value="bank_transfer">Thẻ</option>
              <option value="momo">Chuyển khoản</option>
              <option value="cod">Tiền mặt</option>
            </select>
          </div>

          {/* Form for Card */}
          {paymentMethod === 'bank_transfer' && (
            <div className="payment-form">
              <input className="payment-input" placeholder="Card number" />
              <div className="payment-form-row">
                <input className="payment-input" placeholder="MM/YY" />
                <input className="payment-input" placeholder="CVV" />
              </div>
            </div>
          )}

          {/* QR for Bank transfer */}
          {paymentMethod === 'momo' && (
            <div className="payment-bank-info">
              <h3>Chuyển khoản ngân hàng</h3>
              <p><strong>Ngân hàng:</strong> Agribank</p>
              <p><strong>Số tài khoản:</strong> 8888366927345</p>
              <p><strong>Chủ tài khoản:</strong> Phan Thanh Thoại</p>
              <p><strong>Nội dung chuyển khoản:</strong> {userNamepay} đã thanh toán</p>
              <img
                src={`https://img.vietqr.io/image/Agribank-8888366927345-compact2.png?amount=${cartTotal.toFixed(0)}&addInfo=${encodeURIComponent('Thanh toan boi ' + userNamepay)}`}
                alt="QR Chuyển khoản"
                style={{ width: 250, height: 250, marginTop: 12 }}
              />
            </div>
          )}

          <button
            className={`payment-pay-btn ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay NOK ${cartTotal.toFixed(2)}`}
          </button>

          <div className="payment-cancel-row">
            <button className="payment-cancel-btn" onClick={() => navigate(-1)}>Cancel payment</button>
          </div>

          <div className="payment-powered">Dinero <span className="checkout">CHECKOUT</span></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
