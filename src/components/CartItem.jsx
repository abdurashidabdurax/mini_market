import React from "react";

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />
      <div className="cart-item-details">
        <div className="cart-item-title">
          {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
        </div>
        <div className="cart-item-price">${item.price}</div>
        <div className="cart-item-controls">
          <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, -1)}>
            -
          </button>
          <input
            type="number"
            className="qty-input"
            value={item.quantity || 1}
            readOnly
          />
          <button className="qty-btn" onClick={() => onUpdateQuantity(item.id, 1)}>
            +
          </button>
          <button className="remove-btn" onClick={() => onRemove(item.id)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
