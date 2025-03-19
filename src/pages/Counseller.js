import React, { useState, useEffect } from "react";
import "../styles/Counsellor.css"; // You can style this according to your needs

const AddCounsellor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    speciality: "",
    experience: "",
    education: "",
    bio: "",
    availability: [],
    location: "",
    time: "",
    image: null,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image input
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle availability selection
  const handleAvailabilityChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData((prev) => ({ ...prev, availability: selected }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "availability") {
        formData[key].forEach((day) => submitData.append("availability[]", day));
      } else {
        submitData.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        body: submitData,
      });
      const data = await response.json();
      if (response.ok) {
        alert("Counsellor added successfully!");
      } else {
        alert("Error adding counsellor");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="counsellor-container">
      <h2>Add Counsellor</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          key !== "image" && key !== "availability" ? (
            <div className="form-group" key={key}>
              <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type={key === "password" ? "password" : "text"}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                required
              />
            </div>
          ) : null
        ))}
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select multiple id="availability" onChange={handleAvailabilityChange}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Add Counsellor</button>
      </form>
    </div>
  );
};

const GetCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    const fetchCounsellors = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/all/");
          const data = await response.json();
          console.log(data); // Check what the data looks like
      
          if (response.ok) {
            setCounsellors(data);
          } else {
            console.error("Error fetching counsellors");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    fetchCounsellors();
  }, []);

  return (
    <div className="counsellor-list">
      <h2>All Counsellors</h2>
      <ul>
        {counsellors && Array.isArray(counsellors) && counsellors.length > 0 ? (
          counsellors.map((counsellor) => (
            <li key={counsellor.email}>
              <h3>{counsellor.name}</h3>
              <p>Email: {counsellor.email}</p>
              <p>Phone: {counsellor.phone}</p>
              <p>Speciality: {counsellor.speciality}</p>
              <p>Experience: {counsellor.experience} years</p>
              <p>Education: {counsellor.education}</p>
              <p>Location: {counsellor.location}</p>
              <p>Availability: {counsellor.availability.join(", ")}</p>
              <img src={counsellor.image} alt={counsellor.name} width="100" />
            </li>
          ))
        ) : (
          <p>No counsellors available.</p>
        )}
      </ul>
    </div>
  );
};

export { AddCounsellor, GetCounsellors };
