import React, { useState } from "react";
import "../styles/LoginPage.css"; // You can style it according to your needs

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = {
      email,
      password,
    };
  
    try {
      console.log("Sending login request:", loginData); // Log data being sent
  
      const response = await fetch("http://localhost:5000/api/login", {
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
        // Handle successful login (e.g., redirect or show dashboard)
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
      {error && <p>{error}</p>}
    </div>
  );
};

export default AdminLogin;
