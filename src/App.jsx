import React, { useState, useEffect } from "react";
import CartList from "./components/cartList";
import "./style.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    const handleAddToCart = (e) => {
      const product = e.detail;

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);

        let updated;
        if (existingItem) {
          updated = prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updated = [...prevItems, { ...product, quantity: 1 }];
        }

        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    };

    window.eventBus.addEventListener("addToCart", handleAddToCart);

    const cartBtn = document.getElementById("cartBtn");
    const toggleSidebar = () => setIsOpen((prev) => !prev);
    cartBtn?.addEventListener("click", toggleSidebar);

    const overlay = document.getElementById("overlay");
    overlay?.addEventListener("click", () => setIsOpen(false));

    return () => {
      window.eventBus.removeEventListener("addToCart", handleAddToCart);
      cartBtn?.removeEventListener("click", toggleSidebar);
      overlay?.removeEventListener("click", () => setIsOpen(false));
    };
  }, []);
  

  // cartItems o'zgarganda badge ni ham yangilimiz
  useEffect(() => {
    const cartBtn = document.getElementById("cartBtn");
    const badge = cartBtn?.querySelector(".cart-badge-header");

    if (badge) {
      const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
      badge.textContent = totalQuantity;
      badge.style.display = totalQuantity > 0 ? "flex" : "none";
    }
  }, [cartItems]); 

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) => {
      const updated = prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean); 

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const closeSidebar = () => setIsOpen(false);

  const totalSum = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className={`overlay ${isOpen ? "active" : ""}`} id="overlay"></div>

      <div className={`cart-sidebar ${isOpen ? "active" : ""}`}>
        <div className="cart-header">
          <div className="cart-title">
            <i className="fa-solid fa-cart-arrow-down"></i> Savat
            <span className="cart-badge">{totalItems}</span>
          </div>
          <button className="close-cart" onClick={closeSidebar}>
            x
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
              Savatingiz bo'sh
            </p>
          ) : (
            <CartList items={cartItems} onRemove={removeItem} onUpdateQuantity={updateQuantity} />
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span className="total-label">Jami:</span>
            <span className="total-amount">${totalSum}</span>
          </div>
          <button className="checkout-btn">Buyurtma berish</button>
        </div>
      </div>
    </>
  );
}

export default App;