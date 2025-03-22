import React, { useState, useEffect } from "react";

const FetchPosts = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(""); // State to track any errors

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("authToken"); // Get token from localStorage

      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/post/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the header
          },
        });

        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts); // Set posts if the fetch is successful
        } else {
          setError(data.error || "Error fetching posts");
        }
      } catch (error) {
        setError("Error fetching posts");
      } finally {
        setLoading(false); // Set loading state to false after fetch
      }
    };

    fetchPosts(); // Fetch posts when the component mounts
  }, []);

  // Delete post function
  const deletePost = async (postId) => {
    const token = localStorage.getItem("authToken"); // Get token from localStorage

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the post from the state to update the UI
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        setError(data.error || "Error deleting post");
      }
    } catch (error) {
      setError("Error deleting post");
    }
  };

  return (
    <div>
      <h2>All Admin Posts</h2>

      {loading && <p>Loading posts...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 && !loading && <p>No posts found.</p>}

      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>

            {/* Ensure you're rendering the category name instead of the whole category object */}
            {post.category && post.category.name && <p><strong>Category:</strong> {post.category.name}</p>}

            {/* Check if image exists before rendering */}
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} width="200" />}

            {/* Render userId, but make sure it's not an object */}
            {post.userId && post.userId._id && <p><strong>Created By:</strong> {post.userId._id}</p>}
            
            {/* Ensure likes and comments are properly rendered as numbers */}
            <p><strong>Likes:</strong> {post.likes ? post.likes.length : 0}</p>
            <p><strong>Comments:</strong> {post.comments ? post.comments.length : 0}</p>

            {/* Delete button */}
            <button onClick={() => deletePost(post._id)}>Delete Post</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchPosts;
