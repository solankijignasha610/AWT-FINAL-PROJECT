import ProductCard from "../components/ProductCard";

function GirlsCollection() {

  const girlsProducts = [
    {
      id: 1,
      name: "Traditional Dress",
      price: 3500,
      image: "/images/traditional_dresses.jpg"
    },
    {
      id: 2,
      name: "Gen Z Outfit",
      price: 2500,
      image: "/images/genz_outfits.jpg"
    },
    {
      id: 3,
      name: "Bodycon Dress",
      price: 4000,
      image: "/images/bodycon.jpg"
    },
    {
      id: 4,
      name: "Makeup Kit",
      price: 8000,
      image: "/images/make_up.jpg"
    },
    {
      id: 5,
      name: "Heels",
      price: 3500,
      image: "/images/heels.jpg"
    }
  ];

  return (
    <div className="girls-container">
      <h2 className="girls-title">Girls Collection</h2>
      <div className="products-grid" style={{
          display: "grid",
          gap: "20px",
        }}>
        {girlsProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default GirlsCollection;