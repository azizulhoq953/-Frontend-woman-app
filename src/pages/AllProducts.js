import React, { useEffect, useState } from "react";
import "../styles/AllProducts.css"; // Create a separate CSS file for styling

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch all products on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="all-products-container">
      <h2>All Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <img src={product.images[0]} alt={product.name} width="100" />
              <a href={`/product/${product._id}`}>View Details</a>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
