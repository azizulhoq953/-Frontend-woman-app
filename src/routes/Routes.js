// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Dashboard from '../pages/Dashboard';
// import Orders from '../pages/Orders';
// import Category from '../pages/Category';
// import Products from '../pages/Products';
// import AllProducts from '../pages/AllProducts';
// import ProductDetail from '../pages/ProductDetail';
// import Post from '../pages/Post';
// import { AddCounsellor, GetCounsellors } from '../pages/Counseller';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/orders" element={<Orders />} />
//       <Route path="/category" element={<Category />} />
//       <Route path="/products" element={<Products />} />
//       <Route path="/allproducts" element={<AllProducts />} />
//         <Route path="/product/:id" element={<ProductDetail />} />
//       <Route path="/post" element={<Post />} />
//       <Route path="/counseller" element={AddCounsellor}/>
//       <Route path="/counseller" element={GetCounsellors}/>
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
import { AddCounsellor, GetCounsellors } from '../pages/Counseller';
import MentalHealth from '../pages/mentalhealth';
import LoginPage from '../pages/login';
import FetchPosts from '../pages/all-post';

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
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
