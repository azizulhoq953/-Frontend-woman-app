// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import "./Table.css";

// const makeStyle = (status) => {
//   if (status === "Approved") {
//     return {
//       background: "rgb(145 254 159 / 47%)",
//       color: "green",
//     };
//   } else if (status === "Pending") {
//     return {
//       background: "#ffadad8f",
//       color: "red",
//     };
//   } else {
//     return {
//       background: "#59bfff",
//       color: "white",
//     };
//   }
// };

// export default function BasicTable() {
//   const [orders, setOrders] = useState([]); // state to store fetched orders

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("authToken"); // Get the token from localStorage

//       if (!token) {
//         console.error("No token found, please log in first.");
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/admin/all-orders", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setOrders(data); // set the fetched orders data into the state
//         } else {
//           console.error("Error fetching orders:", data.error);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchOrders(); // fetch orders on component mount
//   }, []);

//   return (
//     <div className="Table">
//       <h3>Recent Orders</h3>
//       <TableContainer
//         component={Paper}
//         style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
//       >
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Product</TableCell>
//               <TableCell align="left">Tracking ID</TableCell>
//               <TableCell align="left">Date</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Additional Details</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody style={{ color: "white" }}>
//             {orders.length > 0 ? (
//               orders.map((row) => (
//                 <TableRow
//                   key={row.trackingId}
//                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                 >
//                   <TableCell component="th" scope="row">
//                     {row.product}
//                   </TableCell>
//                   <TableCell align="left">{row.trackingId}</TableCell>
//                   <TableCell align="left">{row.date}</TableCell>
//                   <TableCell align="left">
//                     <span className="status" style={makeStyle(row.status)}>
//                       {row.status}
//                     </span>
//                   </TableCell>
//                   <TableCell align="left" className="Details">
//                     Details
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No orders available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
