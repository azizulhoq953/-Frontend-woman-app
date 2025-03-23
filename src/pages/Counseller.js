import React, { useState } from "react";
import "../styles/Counsellor.css"; // You can style this according to your needs

const AddCounsellor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    experience: "",
    education: "",
    bio: "",
    availability: [], // Handle availability as an array
    location: "",
    time: "",
    image: null,
  });

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
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Please log in first.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        body: submitData,
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Counselor added successfully!");
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          specialty: "",
          experience: "",
          education: "",
          bio: "",
          availability: [],
          location: "",
          time: "",
          image: null,
        });
      } else {
        alert(data.error || "Error adding counselor");
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

export { AddCounsellor };
