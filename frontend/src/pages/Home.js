import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Home.css";

function Home(){

return(

<div className="hero container">

       <div className="home-left">
        <img src={logo} alt="Urban Fashion" className="home-logo"/>
      </div>

<div className="home-right">

<h1>Urban Fashion</h1>

<p>Discover the best deals on electronics, fashion and more.</p>

<Link to="/products">
<button className="hero-btn">
Start Shopping
</button>
</Link>

</div>

</div>

)

}

export default Home