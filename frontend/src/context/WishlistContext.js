import React, { createContext, useContext, useState, useCallback } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // 🛒 GET WISHLIST (backend se load)
  const loadWishlist = useCallback(() => {
    fetch("http://localhost:5000/api/wishlist", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data => {
        setWishlist(data.items || []);
      })
      .catch(err => console.log(err));
  }, []);

  // 🔹 Add
  const addToWishlist = (product) => {
    fetch("http://localhost:5000/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ product })
    })
      .then(() => loadWishlist())
      .catch(err => console.log(err));
  };

  // 🔹 Remove
  const removeFromWishlist = (id) => {
    fetch(`http://localhost:5000/api/wishlist/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(() => loadWishlist())
      .catch(err => console.log(err));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loadWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};