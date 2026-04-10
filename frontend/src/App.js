import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import GirlsCollection from "./pages/GirlsCollection";
import BoysCollection from "./pages/BoysCollection";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/girls" element={<GirlsCollection />} />
          <Route path="/boys" element={<BoysCollection />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;