import React from "react";
import CartItem from "./CartItem";

function CartList({ items, onRemove, onUpdateQuantity }) {
  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  );
}

export default CartList;
