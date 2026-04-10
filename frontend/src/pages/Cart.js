import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {

const { cart, loadCart, removeFromCart } = useCart();

useEffect(()=>{
loadCart();
},[loadCart]);

return (

<div className="cart-page">

<h2>Your Shopping Cart</h2>

{cart.length === 0 ? (
<p className="empty-cart">Your cart is empty</p>
) : (

<div className="cart-container">

{cart.map((item) => (

<div className="cart-box" key={item.productId}>

<img src={item.image} alt={item.name} />

<div className="cart-info">

<h3>{item.name}</h3>

<p>Price: ₹{item.price}</p>

<p>Qty: {item.quantity}</p>

<button
className="remove-btn"
onClick={() => removeFromCart(item.productId)}
>
Remove
</button>

</div>

</div>

))}

</div>

)}

</div>

)

}

export default Cart;