import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // 🛒 GET CART (backend se load)
  const loadCart = useCallback(() => {
    fetch("http://localhost:5000/api/cart", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        // ⚠️ safety check
        setCart(data.items || []);
      })
      .catch(err => console.log(err));
  }, []);

  // ➕ ADD TO CART
  const addToCart = (product) => {
    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ product })
    })
      .then(() => loadCart())
      .catch(err => console.log(err));
  };

  // ❌ REMOVE
  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/api/cart/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(() => loadCart())
      .catch(err => console.log(err));
  };

  return (
    <CartContext.Provider value={{ cart, loadCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};