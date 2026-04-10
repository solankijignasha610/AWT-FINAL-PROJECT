import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
return(

<nav className="navbar">

<div className="logo">
Urban Fashion
</div>

<div className="nav-links">
<Link to="/">Home</Link>
<Link to="/products">Products</Link>
<Link to="/wishlist">Wishlist</Link>
<Link to="/cart">Cart</Link>
<Link to="/girls">Girls Collection</Link>
<Link to="/boys">Boys Collection</Link>
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </a>

</div>

</nav>

)
}

export default Navbar