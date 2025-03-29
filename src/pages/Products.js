import React, { useState, useEffect } from "react";
import "../styles/createProduct.css"; // Assuming you have a corresponding CSS file

const CreateProduct = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [category, setCategory] = useState(""); // Store selected category
  const [name, setName] = useState(""); // Store name of the product
  const [description, setDescription] = useState(""); // Store description of the product
  const [price, setPrice] = useState(""); // Store price of the product
  const [images, setImages] = useState([]); // Store the selected image files
  const [imagePreviews, setImagePreviews] = useState([]); // Store the image preview URLs
  const [loading, setLoading] = useState(false); // Loading state for product creation
  const [error, setError] = useState(""); // Store any error messages

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        setLoadingCategories(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/allcategory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send token in Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories); // Set categories in the state
        } else {
          setError("Error fetching categories");
        }
      } catch (error) {
        setError("Error fetching categories");
      } finally {
        setLoadingCategories(false); // Set loading state to false after fetch
      }
    };

    fetchCategories(); // Fetch categories when component mounts
  }, []);

  // Handle image file change (image upload)
  const handleImageChange = (e) => {
    const files = e.target.files; // Get the selected files
    if (files) {
      setImages(files); // Set the selected files to state

      // Generate previews for each selected image
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previewUrls);
    }
  };

  // Handle form submission for creating a product
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!category || !name || !description || !price || images.length === 0) {
      setError("All fields are required");
      return;
    }
    
    setLoading(true);
    
    const token = localStorage.getItem("authToken");
    
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    
    // Change to match your backend expectation ("image" instead of "images")
    Array.from(images).forEach((image) => {
      formData.append("image", image); // Changed from "images" to "image"
    });
    
    try {
      console.log("Sending request with token:", token);
      
      const response = await fetch("http://localhost:5000/api/admin/addProduct", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          // Don't set Content-Type header for FormData; browser will set it with boundary
        },
        body: formData,
      });
      
      // Log response for debugging
      console.log("Response status:", response.status);
      
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        // Success handling
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImages([]);
        setImagePreviews([]);
        setError("");
        alert("Product created successfully!");
      } else {
        setError(data.error || "Error creating product");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error creating product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-container">
      <h3>Create Product</h3>

      {/* Display error if there is one */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Category Selection */}
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Send the _id of the category
          required
        >
          <option value="">Select a category</option>
          {loadingCategories ? (
            <option>Loading categories...</option>
          ) : (
            categories.map((category) => (
              <option key={category._id} value={category._id}> {/* Send the _id */}
                {category.name}
              </option>
            ))
          )}
        </select>

        {/* Product Name */}
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Product Description */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Product Price */}
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Product Image Upload */}
        <label htmlFor="image">Image Upload:</label>
        <input
          type="file"
          id="image"
          name="image"  // Added to match backend expectation
          accept="image/*"
          multiple
          onChange={handleImageChange}
          required
        />

        {/* Show image previews */}
        <div className="image-previews">
          {imagePreviews.length > 0 && imagePreviews.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} width="100" />
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;