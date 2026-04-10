import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products(){

const [products, setProducts] = useState([]);

// 🔗 Backend se data fetch
useEffect(()=>{

fetch("http://localhost:5000/api/products")
.then(res => res.json())
.then(data => setProducts(data))
.catch(err => console.log(err));

},[]);

return(

<div className="products-page">

<h2>Featured Products</h2>

<div className="product-grid">

{products.map((product)=>(
<ProductCard key={product._id} product={product}/>
))}

</div>

</div>

)

}

export default Products;