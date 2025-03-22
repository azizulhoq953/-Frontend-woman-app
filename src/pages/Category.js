// import React, { useState, useEffect } from "react";
// import "../styles/Category.css"; // Import the CSS file

// const Category = () => {
//   const [categories, setCategories] = useState([]);  // To store the fetched categories
//   const [newCategory, setNewCategory] = useState(""); // For storing the new category input value
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Fetch existing categories from the backend when component mounts
//   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:5000/api/allcategory")  // Adjust API URL as per your needs
//       .then((res) => res.json())
//       .then((data) => {
//         setCategories(data.categories || []); // Ensure categories exist in data
//       })
//       .catch((err) => {
//         setError("Error fetching categories: " + err.message);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   // Handle removing a category
//   const handleRemoveCategory = async (categoryId) => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("You need to be logged in first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/category/${categoryId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setCategories(categories.filter((category) => category._id !== categoryId)); // Remove category from state
//       } else {
//         setError(data.error || "Error removing category");
//       }
//     } catch (error) {
//       setError("Error removing category: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle input change for the new category name
//   const handleInputChange = (e) => {
//     setNewCategory(e.target.value);
//   };

//   // Handle form submission to create a new category
//   const handleCreateCategory = async (e) => {
//     e.preventDefault();

//     if (!newCategory.trim()) {
//       setError("Please enter a category name.");
//       return;
//     }

//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("You need to log in first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/admin/category", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name: newCategory }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setCategories((prevCategories) => [...prevCategories, data.category]); // Add the new category to the list
//         setNewCategory(""); // Clear the input field
//       } else {
//         setError(data.error || "Error creating category");
//       }
//     } catch (error) {
//       setError("Error creating category: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="category-container">
//       <h2>Category Management</h2>

//       {/* Error Message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <p>Loading...</p>}

//       {/* Form to create a new category */}
//       <div className="create-category-form">
//         <input
//           type="text"
//           value={newCategory}
//           onChange={handleInputChange}
//           placeholder="Enter new category name"
//         />
//         <button onClick={handleCreateCategory}>Create Category</button>
//       </div>

//       {/* Category List */}
//       <div className="category-list">
//         <h3>Existing Categories</h3>
//         {categories.length > 0 ? (
//           categories.map((category) => (
//             <div key={category._id} className="category-item">
//               <span>{category.name}</span>
//               <button onClick={() => handleRemoveCategory(category._id)} className="delete-btn">
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No categories available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Category;
import React, { useState, useEffect } from "react";


const Category = () => {
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

export default Category;
