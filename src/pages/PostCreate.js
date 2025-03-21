import React, { useState, useEffect } from "react";

const PostCreate = () => {
  const [categories, setCategories] = useState([]); // Store categories
  const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
  const [category, setCategory] = useState(""); // Store selected category
  const [title, setTitle] = useState(""); // Store title of the post
  const [description, setDescription] = useState(""); // Store description of the post
  const [image, setImage] = useState(null); // Store the selected image file
  const [imagePreview, setImagePreview] = useState(""); // Store the image preview URL
  const [loading, setLoading] = useState(false); // Loading state for post creation
  const [error, setError] = useState(""); // Store any error messages

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

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
    e.preventDefault(); // Prevent page refresh

    if (!category || !title || !description || !image) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    const postData = {
      category,
      title,
      description,
    };

    const token = localStorage.getItem("authToken");

    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image); // Append the image file to FormData

      const response = await fetch("http://localhost:5000/api/admin/post", {
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
        alert("Post created successfully!");
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
      <h3>Create Post</h3>

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

export default PostCreate;
