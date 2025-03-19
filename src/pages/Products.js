import React, { useState } from "react";
import "../styles/Product.css"; // You can style this according to your needs

const Product = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(""); // Category ID
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // Array to hold image files

  // Handle form input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "category") setCategory(value);
    if (name === "description") setDescription(value);
    if (name === "price") setPrice(value);
  };

  // Handle image input (multiple image uploads)
  const handleImageChange = (e) => {
    setImages([...e.target.files]);  // Storing file objects
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send images
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("price", price);

    try {
      const response = await fetch("http://localhost:5000/api/admin/addProduct", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Product created successfully!");
        // Optionally, reset form or update UI with the new product
      } else {
        alert("Error creating product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="product-container">
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default Product;
