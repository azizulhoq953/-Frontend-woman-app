// import React, { useState, useEffect } from "react";
// import { FaTrashAlt } from 'react-icons/fa';
// import "../styles/get-mental.css";

// const GetMentalHealthPosts = () => {
//   const [mentalHealthPosts, setMentalHealthPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMentalHealthPosts = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setError("No token found, please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/admin/mental", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log("Mental Health Posts Data:", data);

//         if (response.ok) {
//           setMentalHealthPosts(data.posts);
//         } else {
//           setError(data.error || "Error fetching mental health posts");
//         }
//       } catch (error) {
//         setError("Error fetching mental health posts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMentalHealthPosts();
//   }, []);

//   const handleRemovePost = async (postId) => {
//     if (!postId) {
//       setError("Post ID is missing!");
//       return;
//     }

//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("You need to be logged in first.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/mental/${postId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMentalHealthPosts((prevPosts) =>
//           prevPosts.filter((post) => post._id !== postId)
//         );
//         alert("Post deleted successfully!");
//       } else {
//         setError(data.error || "Error removing post");
//       }
//     } catch (error) {
//       setError("Error removing post: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mental-health-container">
//       <h2>Mental Health Posts</h2>

//       {error && <p className="error-message">{error}</p>}
//       {loading && <p className="loading-message">Loading...</p>}

//       <div className="table-container">
//         <table className="posts-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Image</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {mentalHealthPosts.length > 0 ? (
//               mentalHealthPosts.map((post) => (
//                 <tr key={post._id}>
//                   <td>{post.title}</td>
//                   <td>{post.categoryName}</td>
//                   <td>{post.description}</td>
//                   <td>
//                     {post.imageUrl && (
//                       <img
//                         src={post.imageUrl}
//                         alt={post.title}
//                         className="post-image"
//                         width="100" // Adjust as needed
//                       />
//                     )}
//                   </td>
//                   <td>{new Date(post.createdAt).toLocaleString()}</td>
//                   <td>{new Date(post.updatedAt).toLocaleString()}</td>
//                   <td>
//                   <button onClick={() => handleRemovePost(post._id)} className="remove-btn">
//               <FaTrashAlt /> {/* React Icons Trash Icon */}
//                 </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No mental health posts available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GetMentalHealthPosts;

import React, { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import "../styles/get-mental.css";

const GetMentalHealthPosts = () => {
  const [mentalHealthPosts, setMentalHealthPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        console.log("Mental Health Posts Data:", data);

        if (response.ok) {
          setMentalHealthPosts(data.posts);
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

  const handleRemovePost = async (postId) => {
    if (!postId) {
      setError("Post ID is missing!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You need to be logged in first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/admin/mental/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMentalHealthPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        alert("Post deleted successfully!");
      } else {
        setError(data.error || "Error removing post");
      }
    } catch (error) {
      setError("Error removing post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mental-health-container">
      <h2>Mental Health Posts</h2>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      <div className="table-container">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentalHealthPosts.length > 0 ? (
              mentalHealthPosts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.categoryName}</td>
                  <td>{post.description}</td>
                  <td>
                    {/* Check if imageUrls exist and render the image */}
                    {post.imageUrls && post.imageUrls.length > 0 ? (
                      <img
                        src={post.imageUrls[0]}  // Use the first image from imageUrls array
                        alt={post.title}
                        className="post-image"
                        width="100" // Adjust as needed
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td>{new Date(post.createdAt).toLocaleString()}</td>
                  <td>{new Date(post.updatedAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleRemovePost(post._id)} className="remove-btn">
                      <FaTrashAlt /> {/* React Icons Trash Icon */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No mental health posts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetMentalHealthPosts;

