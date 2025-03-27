import React, { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import "../styles/getcounseller.css";

const GetCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounsellors = async () => {
      const token = localStorage.getItem("authToken");  // Get the token from localStorage
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Include token in header for authentication
          },
        });

        const data = await response.json();

        if (response.ok) {
          setCounsellors(data.counselors);  // Set the counselors data from the response
        } else {
          setError(data.error || "Error fetching counselors");
        }
      } catch (error) {
        setError("Error fetching counselors");
      } finally {
        setLoading(false);
      }
    };

    fetchCounsellors(); // Fetch counselors when component mounts
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/counselor/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCounsellors(counsellors.filter((counsellor) => counsellor._id !== id));
      } else {
        setError(data.error || "Error deleting counselor");
      }
    } catch (error) {
      setError("Error deleting counselor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="counsellors-container">
      <h2 className="heading">All Counsellors</h2>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {counsellors.length === 0 && !loading && <p>No counselors available.</p>}

      <div className="table-container">
        <table className="counsellors-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Specialty</th>
              <th>Experience</th>
              <th>Location</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {counsellors.length > 0 ? (
              counsellors.map((counsellor) => (
                <tr key={counsellor._id}>
                  <td>
                    {counsellor.image ? (
                      <img
                        src={`http://localhost:5000/${counsellor.image}`}
                        alt={counsellor.name}
                        className="counsellor-image"
                        width="50" // Adjust as needed
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </td>
                  <td>{counsellor.name}</td>
                  <td>{counsellor.email}</td>
                  <td>{counsellor.phone}</td>
                  <td>{counsellor.specialty}</td>
                  <td>{counsellor.experience} years</td>
                  <td>{counsellor.location}</td>
                  <td>{counsellor.availability.join(", ")}</td>
                  <td>
                  <button onClick={() => handleDelete(counsellor._id)} className="remove-btn">
              <FaTrashAlt /> {/* React Icons Trash Icon */}
                </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No counselors available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetCounsellors;
