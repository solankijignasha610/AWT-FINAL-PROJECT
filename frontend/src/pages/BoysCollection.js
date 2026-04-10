import ProductCard from "../components/ProductCard";

function BoysCollection() {

  const boysProducts = [
    {
      id: 1,
      name: "Genz Shirt",
      price: 2500,
      image: "/images/genz_shirts.jpg"
    },
    {
      id: 2,
      name: "Jeans",
      price: 1900,
      image: "/images/jeans.jpg"
    },
    {
      id: 3,
      name: "Hoodie",
      price: 5000,
      image: "/images/hoodie.jpg"
    },
    {
      id: 4,
      name: "Sneakers",
      price: 4000,
      image: "/images/sneakers.jpg"
    },
    {
      id: 5,
      name: "Watch",
      price: 200000,
      image: "/images/watch.jpg"
    }
  ];

  return (
    <div className="boys-container">
      <h2 className="boys-title">Boys Collection</h2>
      <div className="products-grid" style={{
          display: "grid",
          gap: "20px",
        }}>
        {boysProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default BoysCollection;