import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import Error from "./component/layout/Error";
import Home from "./component/Home/Home";
import AboutUs from "./component/layout/AboutUs";
import Cart from "./component/Cart/Cart";
import CheckOut from "./component/Cart/CheckOut";
import OrderSuccess from "./component/Cart/OrderSuccess";
import DetailProduct from "./component/Product/DetailProduct";
import Products from "./component/Product/Products";
import Footer from "./component/layout/Footer/Footer";
import LoginSignUp from "./component/User/LoginSignUp";
import UserDashboard from "./component/Pages/UserDashboard";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import OrderDetail from "./component/Order/OrderDetail";
import AdminDashboard from "./component/Admin/AdminDashboard";

import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ElementsRoute from "./component/Route/ElementsRoute";
import Blog from "./component/Blog";
import Chat from "./component/layout/Chatting/Chat";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/stripeapikey"
    );
    setStripeApiKey(data);
  }
  if (isAuthenticated) {
    getStripeApiKey();
  }

  return (
    <div className="app">
      {isAuthenticated ? <Header user={user} /> : <Header />}
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={[<Home />]}></Route>
        <Route path="/product/:id" element={<DetailProduct />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:keyword" element={<Products />}></Route>
        <Route path="/login" element={<LoginSignUp />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/blog" element={<Blog />}></Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/user/*" element={<UserDashboard />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />}></Route>
          {stripeApiKey && (
            <Route
              element={<ElementsRoute stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/checkout" element={<CheckOut />}></Route>
            </Route>
          )}
          <Route path="/success" element={<OrderSuccess />}></Route>
          <Route path="/order/:id" element={<OrderDetail />}></Route>
        </Route>

        <Route element={<ProtectedRoute isAdmin={true} />}>
          <Route path="/admin/*" element={<AdminDashboard />}></Route>
        </Route>
      </Routes>
      {isAuthenticated ? <Chat user={user} /> : ""}
      <Footer />
    </div>
  );
}

export default App;
