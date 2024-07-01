import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./User/Login";
import Registration from "./User/Registration";
import Header from "./Core/Header";
import Footer from "./Core/Footer";
import Home from "./homePage/Home";
import Products from "./Products/Products";
import { AuthProvider } from "./AuthContext/authContext"
import PrivateRoutes from "./Auth/PrivateRoutes";
import UserDashboard from "./User/Dashboard/UserDashboard";
import Unauthorized from "./User/Unauthorized";
import AdminDashboard from "./User/AdminDashboard";
import ProductDetails from "./Products/ProductDetails";
import CreateCategory from "./User/AdminComponents/Create/CreateCategory";
import CreateManufacturer from "./User/AdminComponents/Create/CreateManufacturer";
import CreateProduct from "./User/AdminComponents/Create/CreateProduct";
import UpdateCategory from "./User/AdminComponents/Update/UpdateCategory";
import UpdateManufacturer from "./User/AdminComponents/Update/UpdateManufacturer";
import UpdateProduct from "./User/AdminComponents/Update/UpdateProduct";
import UpdateOrders from "./User/AdminComponents/Update/UpdateOrders";
import UpdateUsers from "./User/AdminComponents/Update/UpdateUsers";
import Cart from "./Cart/Cart";
import ShippingInfo from "./Cart/ShippingInfo";
import Payment from "./Cart/Payment";
import CheckoutSuccess from "./Cart/CheckoutSuccess";
import NotFound from "./404";


function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <Header/>
    <Routes>
      <Route element={<PrivateRoutes allowedRoles={[0,1]}/>}>
      <Route path="/userDashboard" exact element={<UserDashboard />}/>
      <Route path="/cart"  exact element={<Cart />}/>
      <Route path="/success"  exact element={<CheckoutSuccess />}/>
      <Route path="/shippingInfo/:orderId"  exact element={<ShippingInfo />}/>
      <Route path="/payment"  exact element={<Payment />}/>
      </Route>
      <Route element={<PrivateRoutes allowedRoles={[1]}/>}>
        <Route path="/adminDashboard" exact element={<AdminDashboard/>}/>
        <Route path="/newCategory"  element={<CreateCategory/>}/>
        <Route path="/newManufacturer"  element={<CreateManufacturer/>}/>
        <Route path="/newProduct"  element={<CreateProduct/>}/>
        <Route path="/editCategory/:categoryId"  element={<UpdateCategory/>}/>
        <Route path="/editManufacturer/:manufacturerId"  element={<UpdateManufacturer/>}/>
        <Route path="/editProduct/:productId"  element={<UpdateProduct/>}/>
        <Route path="/editOrder/:orderId"  element={<UpdateOrders/>}/>
        <Route path="/editUser/:userId"  element={<UpdateUsers/>}/>
      </Route>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/products" exact element={<Products/>}/>
      <Route path="/products/id/:productId" element={<ProductDetails/>} />
      <Route path="/unauthorized" element={<Unauthorized/>}/>
      <Route path="/login" exact element={<Login/>}></Route>
      <Route path="/register" exact element={<Registration/>}/>
     
    </Routes>
    <Footer/>
    </AuthProvider>
  </BrowserRouter>);
}
export default App ;
