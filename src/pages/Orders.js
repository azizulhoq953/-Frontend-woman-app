import React, { useState, useEffect } from "react";

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      // Get the token from localStorage (or wherever it's stored)
      const token = localStorage.getItem("authToken"); // assuming the token is stored in localStorage

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/admin/all-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError("Error fetching orders: Unauthorized");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h2>All Orders</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Customer Name: {order.customerName}</p>
              <p>Email: {order.email}</p>
              <p>Phone: {order.phone}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Items:</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <p>Item: {item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </ul>
    </div>
  );
};

export default GetAllOrders;
