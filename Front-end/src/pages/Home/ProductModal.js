import './ProductModal.scss';

function ProductModal({ open, onClose, product, quantity, setQuantity, onAddToCart }) {
  if (!open || !product) return null;
  if(quantity> product.quantity) return alert('Số lượng không hợp lê!');
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">ADD TO CART</div>
        <div className="modal-body">
          <div className="modal-img-block">
            <img src={`http://localhost:3000/uploads/${product.image}`} alt={product.name} className="modal-img" />
          </div>
          <div className="modal-info-block">
            <div className="modal-row">
              <div><b>ID</b><div>{product.id}</div></div>
              <div><b>{product.name}</b><div>{product.category}</div></div>
              <div className="modal-price-block">
                <div>Price</div>
                <div className="modal-price">{product.price} VNĐ</div>
              </div>
            </div>
            <div className="modal-row modal-qty-row">
              <b>Quantity</b>
              <div className="modal-qty-block">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="modal-qty-btn">-</button>
                <span className="modal-qty">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="modal-qty-btn">+</button>
              </div>
            </div>
            {/* Các thuộc tính khác có thể thêm ở đây */}
            <div className="modal-row modal-attr-row">
              <b>Remaining quantity:</b> <span>{product.quantity}</span>
            </div>
            <div className="modal-row modal-attr-row">
              <b>Description:</b> <span>{product.desciption}</span>
            </div>
          </div>
        </div>
        <button className="modal-add-btn" onClick={() => onAddToCart(product, quantity)}>
          <span role="img" aria-label="cart">🛒</span> {(product.price * quantity).toLocaleString('en-US')} VNĐ
        </button>
      </div>
    </div>
  );
}

export default ProductModal;