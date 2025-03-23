import React, { useState, useEffect } from "react";
import "../styles/Category.css"; // Import the CSS file

const Category = () => {
  const [categories, setCategories] = useState([]);  // To store the fetched categories
  const [newCategory, setNewCategory] = useState(""); // For storing the new category input value
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing categories from the backend when component mounts
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/allcategory")  // Adjust API URL as per your needs
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []); // Ensure categories exist in data
      })
      .catch((err) => {
        setError("Error fetching categories: " + err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle removing a category
  const handleRemoveCategory = async (categoryId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You need to be logged in first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCategories(categories.filter((category) => category._id !== categoryId)); // Remove category from state
      } else {
        setError(data.error || "Error removing category");
      }
    } catch (error) {
      setError("Error removing category: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for the new category name
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Handle form submission to create a new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      setError("Please enter a category name.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You need to log in first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      const data = await response.json();
      if (response.ok) {
        setCategories((prevCategories) => [...prevCategories, data.category]); // Add the new category to the list
        setNewCategory(""); // Clear the input field
      } else {
        setError(data.error || "Error creating category");
      }
    } catch (error) {
      setError("Error creating category: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-container">
      <h2>Category Management</h2>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {/* Form to create a new category */}
      <div className="create-category-form">
        <input
          type="text"
          value={newCategory}
          onChange={handleInputChange}
          placeholder="Enter new category name"
        />
        <button onClick={handleCreateCategory}>Create Category</button>
      </div>

      {/* Category List */}
      <div className="category-list">
        <h3>Existing Categories</h3>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="category-item">
              <span>{category.name}</span>
              <button onClick={() => handleRemoveCategory(category._id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};
export default Category;


