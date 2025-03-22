import React, { useState, useEffect } from "react";

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

        const data = await response.json(); // Use the response data

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

    fetchCounsellors();
  }, []);

  return (
    <div>
      <h2>All Counsellors</h2>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {counsellors.length === 0 && !loading && <p>No counselors available.</p>}

      <div>
        {counsellors.map((counsellor) => (
          <div key={counsellor._id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <h3>{counsellor.name}</h3>
            <p>Email: {counsellor.email}</p>
            <p>Phone: {counsellor.phone}</p>
            <p>Specialty: {counsellor.specialty}</p>
            <p>Experience: {counsellor.experience} years</p>
            <p>Education: {counsellor.education}</p>
            <p>Location: {counsellor.location}</p>
            <p>Availability: {counsellor.availability.join(", ")}</p>
            {counsellor.image && <img src={`http://localhost:5000/${counsellor.image}`} alt={counsellor.name} width="100" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCounsellors;  // This is the default export
