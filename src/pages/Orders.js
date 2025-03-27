


// import React, { useState, useEffect } from "react";
// import "../styles/OrderPage.css"; // Assuming you've added styles in a CSS file
// import { FaTrashAlt } from 'react-icons/fa';
// const GetAllOrders = () => {
//   const [orders, setOrders] = useState([]); // Store orders
//   const [error, setError] = useState(null); // Store errors
//   const [loading, setLoading] = useState(false); // Loading state for fetching orders

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setError("No token found. Please log in.");
//         return;
//       }

//       setLoading(true);

//       try {
//         const response = await fetch("http://localhost:5000/api/admin/all-orders", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data.orders);
//         } else {
//           setError("Error fetching orders: Unauthorized");
//         }
//       } catch (error) {
//         setError("Error fetching data: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleDeleteOrder = async (orderId) => {
//     const token = localStorage.getItem("authToken");

//     if (!token) {
//       setError("No token found. Please log in.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:5000/api/admin/remove-order/${orderId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         setOrders(orders.filter(order => order._id !== orderId));
//       } else {
//         setError("Failed to delete the order.");
//       }
//     } catch (error) {
//       setError("Error deleting order: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="order-list-container">
//       <h2>All Orders</h2>

//       {error && <p className="error">{error}</p>}
//       {loading && <p className="loading-message">Loading...</p>}

//       {orders.length === 0 && !loading && <p>No orders found.</p>}

//       <div className="table-container">
//         <table className="orders-table">
//           <thead>
//             <tr>
//               <th>Customer Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Status</th>
//               <th>Total</th>
//               <th>Items</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order.userId.name}</td>
//                 <td>{order.userId.email}</td>
//                 <td>{order.userId.phone}</td>
//                 <td>{order.status}</td>
//                 <td>${order.totalAmount}</td>
//                 <td>
//                   <ul>
//                     {order.products.map((item, index) => (
//                       <li key={index}>
//                         <p>{item.productId?.name || "Unknown Product"}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price: ${item.price}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>
//                     <button onClick={() => handleDeleteOrder(order._id)} className="remove-btn">
//                                 <FaTrashAlt /> {/* React Icons Trash Icon */}
//                                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GetAllOrders;

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
              <th>Status</th>
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
                <td>{order.userId.name}</td>
                <td>{order.userId.email}</td>
                <td>{order.userId.phone}</td>
                <td>{order.status}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <ul>
                    {order.products.map((item, index) => (
                      <li key={index}>
                        {/* Handle the case when productId is null */}
                        {item.productId ? (
                          <div>
                            <p>{item.productId.name || "Product Name Unavailable"}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price || "Price unavailable"}</p>
                          </div>
                        ) : (
                          <p>Product details are unavailable</p>
                        )}
                      </li>
                    ))}
                  </ul>
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
