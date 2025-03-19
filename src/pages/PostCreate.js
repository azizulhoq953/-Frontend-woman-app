import React, { useState, useEffect } from "react";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // Start with an empty category
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [loadingPost, setLoadingPost] = useState(false); // Loading state for post creation
  const [error, setError] = useState(""); // Error message state

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = "your_bearer_token_here"; // Replace with the actual token
        const response = await fetch("http://localhost:5000/api/allcategory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the Bearer token here
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCategories(data); // Set the categories state to fetched data
        } else {
          console.error("Error fetching categories", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newPost = { title, category, description };
  
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2QzY2QwM2M0Y2ZhYzc5ZTNjMzE5NyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MjM4MzU5MSwiZXhwIjoxNzQyOTg4MzkxfQ.ERG7hYvbS6-gHP-5LatQAYXAIkWjF46YDHvRkNOv4js"; // Replace with the actual token
      const response = await fetch("http://localhost:5000/api/admin/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include the Bearer token here
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Notify parent component that a post was created
        onPostCreated(data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setCategory(""); // Reset category to the initial empty value
      } else {
        const errorData = await response.json();
        console.error("Error creating post:", errorData); // Log any error message from the server
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {loadingCategories ? (
              <option>Loading categories...</option> // Loading state for categories
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loadingPost}>
          {loadingPost ? "Creating..." : "Create Post"} {/* Button text for loading state */}
        </button>
      </form>
    </div>
  );
}
