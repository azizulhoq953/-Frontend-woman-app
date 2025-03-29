import React, { useState, useEffect } from "react";
import { FaTrashAlt } from 'react-icons/fa';
import "../styles/OrderPage.css"; // Assuming you've added styles in a CSS file

const GetAllOrders = () => {
  const [orders, setOrders] = useState([]); // Store orders
  const [error, setError] = useState(null); // Store errors
  const [loading, setLoading] = useState(false); // Loading state for fetching orders

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
      {loading && <p className="loading-message">Loading...</p>}

      {orders.length === 0 && !loading && <p>No orders found.</p>}

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Items</th>
              <th>Payment Method</th>
              <th>Transaction ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userId?.name || "Unknown"}</td>
                <td>{order.userId?.email || "No Email"}</td>
                <td>{order.paymentDetails?.phone || "No Phone"}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>
                  {order.products.length > 0 ? (
                    <>
                      <p><strong>Names:</strong> {order.products.map(item => item.productId?.name || "Unnamed Product").join(", ")}</p>
                      <p><strong>Quantities:</strong> {order.products.map(item => item.quantity).join(", ")}</p>
                    </>
                  ) : (
                    <p>No products in order</p>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>{order.transactionId}</td>
                <td>
                  <button onClick={() => handleDeleteOrder(order._id)} className="remove-btn">
                    <FaTrashAlt /> {/* React Icons Trash Icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllOrders;
