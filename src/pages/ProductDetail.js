import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For handling dynamic routes (like /product/:id)
import "../styles/ProductDetail.css"; // Create a separate CSS file for styling

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL parameters
  const [product, setProduct] = useState(null);

  // Fetch product details when the component mounts or when ID changes
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <div className="product-images">
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={`Product Image ${index + 1}`} width="200" />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
