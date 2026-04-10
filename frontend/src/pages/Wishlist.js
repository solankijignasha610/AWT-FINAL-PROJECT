import React, { useEffect } from "react";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

const { wishlist, loadWishlist, removeFromWishlist } = useWishlist();

useEffect(() => {
  loadWishlist();
}, [loadWishlist]);

return (

<div className="wishlist-container">

<h2 className="wishlist-title">My Wishlist ❤️</h2>

{wishlist.length === 0 ? (

<p>Your wishlist is empty</p>

) : (

<div className="wishlist-grid">

{wishlist.map((item) => (

<div className="wishlist-card" key={item.productId}>

<img src={item.image} alt={item.name} />

<h3>{item.name}</h3>

<p>₹{item.price}</p>

<button
className="remove-btn"
onClick={() => removeFromWishlist(item.productId)}
>
Remove
</button>

</div>

))}

</div>

)}

</div>

);

}

export default Wishlist;