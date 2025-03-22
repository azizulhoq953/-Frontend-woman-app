import React, { useState, useEffect } from "react";
import "../styles/mentalhealth.css"; // Make sure to style it properly


const MentalHealthPost = () => {
  const [categories, setCategories] = useState([]);  // Store categories
  const [category, setCategory] = useState("");  // Store selected category
  const [title, setTitle] = useState("");  // Store title of the post
  const [description, setDescription] = useState("");  // Store description of the post
  const [image, setImage] = useState(null);  // Store image file
  const [imagePreview, setImagePreview] = useState("");  // Preview of the image
  const [loading, setLoading] = useState(false);  // Loading state for post creation
  const [error, setError] = useState("");  // Error state

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/allcategory", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCategories(data.categories);  // Set categories in the state
        } else {
          setError("Error fetching categories");
        }
      } catch (error) {
        setError("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle image file change (image upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setImage(file); // Set the selected file to state

      // Generate a preview of the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle form submission for creating a post
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page refresh

    if (!category || !title || !description || !image) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("authToken");

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image); // Append the image file to FormData

      const response = await fetch("http://localhost:5000/api/admin/post/mental", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData, // Send FormData containing the file
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form after successful post creation
        setTitle("");
        setDescription("");
        setImage(null);
        setImagePreview("");
        setCategory("");
        setError(""); // Clear any previous errors
        alert("Mental Health Post created successfully!");
      } else {
        setError(data.error || "Error creating post");
      }
    } catch (error) {
      setError("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create Mental Health Post</h3>

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
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option>Loading categories...</option>
          )}
        </select>

        {/* Post Title */}
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Post Description */}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Post Image Upload */}
        <label htmlFor="image">Image Upload:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange} // Handle image file change
          required
        />

        {/* Show image preview */}
        {imagePreview && <img src={imagePreview} alt="Preview" width="200" />}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default MentalHealthPost;
