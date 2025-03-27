// import React, { useState, useEffect } from "react";
// import "../styles/all-post.css"; // Assuming you've added styles in a CSS file

// const GetAllPosts = () => {
//   const [posts, setPosts] = useState([]); // State to store posts
//   const [error, setError] = useState(null); // State to store error messages
//   const [loading, setLoading] = useState(false); // Loading state for fetching posts

//   // Fetch all posts from the API
//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setError("No token found. Please log in.");
//         return;
//       }

//       setLoading(true);

//       try {
//         const response = await fetch("http://localhost:5000/api/admin/post/get", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPosts(data.posts); // Set fetched posts to the state
//         } else {
//           setError("Error fetching posts: Unauthorized");
//         }
//       } catch (error) {
//         setError("Error fetching data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllPosts();
//   }, []);

//   // Handle the delete post action
//   const handleDeletePost = async (postId) => {
//     const token = localStorage.getItem("authToken");
  
//     if (!token) {
//       setError("No token found. Please log in.");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/post/${postId}`, { // Ensure the URL is correct
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // Send token as Bearer token
//         },
//       });
  
//       if (response.ok) {
//         setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post from state
//         alert("Post removed successfully");
//       } else {
//         setError("Failed to delete the post.");
//       }
//     } catch (error) {
//       setError("Error deleting post: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
// <div className="post-list-container">
//   <h2>All Posts</h2>

//   {error && <p className="error">{error}</p>}
//   {loading && <p className="loading-message">Loading...</p>}

//   {posts.length === 0 && !loading && <p>No posts found.</p>}

//   <div className="post-list">
//     {posts.map((post) => (
//       <div key={post._id} className="post-item">
//         <div className="post-header">
//           <h3>{post.title}</h3>
//           {/* <p>{post.userId?.username || 'Unknown User'}</p> */}
//         </div>

//         <div className="post-details">
//           <p><strong>Category:</strong> {post.categoryName}</p>
//           <p><strong>Description:</strong> {post.description}</p>
//           <img
//       src={post.imageUrl || "/path/to/default/image.jpg"}
//          alt={post.title}
//        width="150" // Adjust the width as per your design
//        style={{ borderRadius: "10px" }}
// />

//         </div>

//         <div className="post-actions">
//           <button onClick={() => handleDeletePost(post._id)} className="delete-button">
//             Delete Post
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// export default GetAllPosts;


import React, { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import "../styles/all-post.css"; // Assuming you've added styles in a CSS file

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setLoading] = useState(false); // Loading state for fetching posts

  // Fetch all posts from the API
  useEffect(() => {
    const fetchAllPosts = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/admin/post/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts); // Set fetched posts to the state
        } else {
          setError("Error fetching posts: Unauthorized");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  // Handle the delete post action
  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/admin/post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post from state
        alert("Post removed successfully");
      } else {
        setError("Failed to delete the post.");
      }
    } catch (error) {
      setError("Error deleting post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-list-container">
      <h2>All Posts</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      {posts.length === 0 && !loading && <p>No posts found.</p>}

      <div className="table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.categoryName}</td>
                <td>{post.description}</td>
                <td>
                  <img
                    src={post.imageUrl || "/path/to/default/image.jpg"}
                    alt={post.title}
                    width="100" // Adjust the width as per your design
                    style={{ borderRadius: "10px" }}
                  />
                </td>
                <td>
                <button onClick={() => handleDeletePost(post._id)} className="remove-btn">
                 <FaTrashAlt /> {/* React Icons Trash Icon */}
               </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllPosts;
