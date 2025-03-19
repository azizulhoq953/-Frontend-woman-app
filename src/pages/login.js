import React, { useState } from "react";
import "../styles/LoginPage.css"; // You can style it according to your needs

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem("authToken", data.token);

        // Call the onLoginSuccess function passed as a prop to notify that login is successful
        if (onLoginSuccess) {
          onLoginSuccess(data.token);  // Ensure it's a function before calling it
        }
      } else {
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
