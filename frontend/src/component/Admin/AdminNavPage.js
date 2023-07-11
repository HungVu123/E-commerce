import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProfile from "./AdminProfile";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminUsers from "./AdminUsers";
import AdminReviews from "./AdminReviews";

export default function AdminNavPage() {
  return (
    <>
      <Routes>
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/products" element={<AdminProducts />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/users" element={<AdminUsers />} />
        <Route path="/reviews/:id" element={<AdminReviews />} />
      </Routes>
    </>
  );
}
