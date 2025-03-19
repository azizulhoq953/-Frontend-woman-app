import React, { useState } from "react";
import AdminLogin from "./login"; // Adjust the path if needed

const ParentComponent = () => {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (token) => {
    // Handle login success logic here, such as redirecting the user or updating state
    console.log("Login successful! Token:", token);
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <p>Welcome Admin!</p>
      )}
    </div>
  );
};

export default ParentComponent;
