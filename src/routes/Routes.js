
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Dashboard';
// import Orders from '../pages/Orders';
// import Category from '../pages/Category';
// import Products from '../pages/Products';
// import AllProducts from '../pages/AllProducts';
// import ProductDetail from '../pages/ProductDetail';
// import CreatePost from '../pages/PostCreate';
// import { AddCounsellor } from '../pages/Counseller';
// import { GetCounsellors } from '../pages/getcounseller';
// import MentalHealth from '../pages/mentalhealth';
// import LoginPage from '../pages/login';
// import FetchPosts from '../pages/all-post';
// import ChangePassword from '../pages/change-pass';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/orders" element={<Orders />} />
//       <Route path="/category" element={<Category />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/allproducts" element={<AllProducts />} />
//       <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/post" element={<CreatePost />} />
//       <Route path="/allPost" element={< FetchPosts/>} />
//       <Route path="/add-counsellor" element={<AddCounsellor />} />
//       <Route path="/get-counsellors" element={<GetCounsellors />} />
//       <Route path="/mentalhealth" element={<MentalHealth />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/change-password" element={<ChangePassword />} />
//     </Routes>
//   );
// };

// export default AppRoutes;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Category from '../pages/Category';
import Products from '../pages/Products';
import AllProducts from '../pages/AllProducts';
import ProductDetail from '../pages/ProductDetail';
import CreatePost from '../pages/PostCreate';
import { AddCounsellor } from '../pages/Counseller';
import GetCounsellors from '../pages/getcounseller';  // Default import
import MentalHealth from '../pages/mentalhealth';
import LoginPage from '../pages/login';
import FetchPosts from '../pages/all-post';
import ChangePassword from '../pages/change-pass';
import GetMentalHealthPosts from '../pages/get-mentalpost';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/category" element={<Category />} />
      <Route path="/products" element={<Products />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/allPost" element={< FetchPosts/>} />
      <Route path="/add-counsellor" element={<AddCounsellor />} />
      <Route path="/get-counsellors" element={<GetCounsellors />} />
      <Route path="/mentalhealth" element={<MentalHealth />} />
      <Route path="/get-mentalhealth" element={< GetMentalHealthPosts/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoutes;
