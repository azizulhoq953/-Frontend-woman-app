import React, { useState, useEffect } from "react";
import "../styles/get-mental.css";
const GetMentalHealthPosts = () => {
    const [mentalHealthPosts, setMentalHealthPosts] = useState([]); // State to hold the posts
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(""); // Error state
  
    // Fetch mental health posts when the component mounts
    useEffect(() => {
      const fetchMentalHealthPosts = async () => {
        const token = localStorage.getItem("authToken");
  
        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          return;
        }
  
        try {
          const response = await fetch("http://localhost:5000/api/admin/mental", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          console.log("Mental Health Posts Data:", data); // Debugging the response
  
          if (response.ok) {
            setMentalHealthPosts(data.posts); // Set posts in the state
          } else {
            setError(data.error || "Error fetching mental health posts");
          }
        } catch (error) {
          setError("Error fetching mental health posts");
        } finally {
          setLoading(false);
        }
      };
  
      fetchMentalHealthPosts();
    }, []);
  
    // Handle removing a mental health post
    const handleRemovePost = async (postId) => {
        if (!postId) {
          setError("Post ID is missing!");  // Display error if post ID is missing
          return;
        }
      
        const token = localStorage.getItem("authToken");  // Get token from localStorage
        if (!token) {
          setError("You need to be logged in first.");  // Display error if not logged in
          return;
        }
      
        setLoading(true);  // Set loading state to true while making the request
      
        try {
          const response = await fetch(`http://localhost:5000/api/admin/mental/${postId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,  // Include token in the Authorization header
            },
          });
      
          const data = await response.json();
      
          if (response.ok) {
            setMentalHealthPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));  // Filter out the deleted post
            alert("Post deleted successfully!");
          } else {
            setError(data.error || "Error removing post");
          }
        } catch (error) {
          setError("Error removing post: " + error.message);  // Handle any fetch errors
        } finally {
          setLoading(false);  // Set loading state to false after request completion
        }
      };
      
    return (
      <div className="mental-health-container">
        <h2>Mental Health Posts</h2>
  
        {error && <p className="error-message">{error}</p>}
  
        {loading && <p className="loading-message">Loading...</p>}
  
        <div className="posts-grid">
          {mentalHealthPosts.length > 0 ? (
            mentalHealthPosts.map((post) => (
              <div key={post._id} className="post-card">
                <h4 className="post-title">{post.title}</h4>
                <p className="post-category">Category: {post.categoryName}</p>
                <p className="post-description">{post.description}</p>
  
                {/* Display image if it exists */}
                {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="post-image" />}
  
                <div className="post-stats">
                  <p><strong>Likes:</strong> {post.likes.length}</p>
                  <p><strong>Comments:</strong> {post.comments.length}</p>
                  <p><strong>Followers:</strong> {post.followers.length}</p>
                </div>
  
                {/* Display dates */}
                <div className="post-dates">
                  <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                  <p><strong>Updated At:</strong> {new Date(post.updatedAt).toLocaleString()}</p>
                </div>
  
                {/* Remove Button */}
                <button onClick={() => handleRemovePost(post._id)} className="remove-btn">
                  Remove Post
                </button>
              </div>
            ))
          ) : (
            <p>No mental health posts available</p>
          )}
        </div>
      </div>
    );
  };
  
  export default GetMentalHealthPosts;