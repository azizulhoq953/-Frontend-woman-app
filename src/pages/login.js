import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import "../styles/LoginPage.css"; // You can style it according to your needs

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      console.log("Sending login request:", loginData); // Log data being sent

      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful! Token:", data.token);
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", data.token);

        // Set success message
        setSuccessMessage("Login successful! Redirecting...");

        // Redirect to dashboard or another page after a short delay
        setTimeout(() => {
          navigate('/orders'); // Redirect to the dashboard or another page
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        console.log("Error in login:", data.error);
        setError("Invalid credentials or error logging in.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default AdminLogin;
