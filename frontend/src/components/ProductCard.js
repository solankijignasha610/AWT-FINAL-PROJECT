import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Confetti from "react-confetti";

function ProductCard({ product }) {

const { addToCart } = useCart();
const { addToWishlist } = useWishlist();

const [celebrate, setCelebrate] = useState(false);

const handleAddToCart = () => {

addToCart(product);

setCelebrate(true);

setTimeout(() => {
setCelebrate(false);
}, 3000);

};

const handleWishlist = () => {
addToWishlist(product);
};

return (

<>

{celebrate && (
<Confetti
width={window.innerWidth}
height={window.innerHeight}
numberOfPieces={250}
recycle={false}
/>
)}

<div className="product-card">

<img src={product.image} alt={product.name}/>

<h3>{product.name}</h3>

<p className="price">₹{product.price}</p>

<p className="rating">⭐ {product.rating}</p>

<button onClick={() => addToCart(product)}>
Add to Cart
</button>

<button onClick={() => addToWishlist(product)}>
❤️ Wishlist
</button>

</div>

</>

)

}

export default ProductCard;