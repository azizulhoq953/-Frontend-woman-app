import React, { useState, useEffect } from "react";
import "../styles/mentalhealth.css";
const MentalHealth = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mental-health-posts"); // Adjust the endpoint as needed
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Error fetching posts");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="mental-health-page">
      <h2>Mental Health Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post._id} className="post-item">
              <h3>{post.title}</h3>
              <p><strong>Category:</strong> {post.category}</p>
              <p><strong>Description:</strong> {post.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default MentalHealth;
