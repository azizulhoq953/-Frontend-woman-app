import React, { useState, useEffect } from "react";
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

      <div className="counsellors-list">
        {counsellors.map((counsellor) => (
          <div key={counsellor._id} className="counsellor-card">
            <div className="counsellor-image">
              {counsellor.image ? (
                <img
                  src={`http://localhost:5000/${counsellor.image}`}
                  alt={counsellor.name}
                  className="image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>

            <div className="counsellor-details">
              <h3>{counsellor.name}</h3>
              <p><strong>Email:</strong> {counsellor.email}</p>
              <p><strong>Phone:</strong> {counsellor.phone}</p>
              <p><strong>Specialty:</strong> {counsellor.specialty}</p>
              <p><strong>Experience:</strong> {counsellor.experience} years</p>
              <p><strong>Location:</strong> {counsellor.location}</p>
              <p><strong>Availability:</strong> {counsellor.availability.join(", ")}</p>

              <button className="delete-btn" onClick={() => handleDelete(counsellor._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCounsellors;