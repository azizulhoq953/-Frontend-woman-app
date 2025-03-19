import React, { useEffect, useState } from "react";
import "../styles/Category.css"; // Import the CSS file

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState(""); // Error state

  // Fetch existing categories from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/allcategory")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Handle form input for new category
  const handleInputChange = (e) => {
    setNewCategory(e.target.value);
  };

  // Handle form submission to create a new category
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newCategory.trim() === "") {
      alert("Please enter a category name");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You need to log in first.");
      return;
    }

    fetch("http://localhost:5000/api/admin/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newCategory }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories((prevCategories) => {
          // Ensure prevCategories is an array
          const updatedCategories = Array.isArray(prevCategories) ? prevCategories : [];
          return [...updatedCategories, data];
        });
        setNewCategory(""); // Clear input field
      })
      .catch((err) => console.error("Error creating category:", err));
  };

  return (
    <div className="category-container">
      <h2>Category List</h2>

      {/* Input box for creating new category */}
      <div className="input-box">
        <input
          type="text"
          value={newCategory}
          onChange={handleInputChange} 
          placeholder="Enter category name"
        />
        <button onClick={handleSubmit}>Create Category</button>
      </div>

      {/* Category list table */}
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{category._id}</td> {/* Assuming _id is the category's unique identifier */}
                  <td>{category.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-data">
                  No categories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
