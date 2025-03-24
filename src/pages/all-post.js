import React, { useState, useEffect } from "react";
import "../styles/all-post.css"; // Assuming you've added styles in a CSS file

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/admin/all-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          setError("Error fetching orders: Unauthorized");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/api/admin/remove-order/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId));
      } else {
        setError("Failed to delete the order.");
      }
    } catch (error) {
      setError("Error deleting order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-list-container">
      <h2>All Orders</h2>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      {orders.length === 0 && !loading && <p>No orders found.</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <div className="order-header">
              <h3>{order.userId.name}</h3>
              <p>{order.userId.email}</p>
            </div>

            <div className="order-details">
              <p><strong>Phone:</strong> {order.userId.phone}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ${order.totalAmount}</p>
              <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.products.map((item, index) => {
                  const imageUrl = item.productId?.image || "/path/to/default/image.jpg";

                  return (
                    <li key={index}>
                      <div className="product-info">
                        <img
                          src={imageUrl}
                          alt={item.productId?.name || "Unknown Product"}
                          width="50"
                          height="50"
                          className="product-image"
                        />
                        <div className="product-details">
                          <p><strong>{item.productId?.name || "Unknown Product"}</strong></p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: ${item.price}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="order-actions">
              <button onClick={() => handleDeleteOrder(order._id)} className="delete-button">
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllOrders
