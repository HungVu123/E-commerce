import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from "./UserProfile";
import UserChangePassword from "./UserChangePassword"
import UserAddress from "./UserAddress";
import UserOrders from './UserOrders';

export default function NavPage() {
  return (
    <>
    <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/changePassword" element={<UserChangePassword />} />
        <Route path="/address" element={<UserAddress />} />
        <Route path="/orders" element={<UserOrders />} />
    </Routes>
    </>
  )
}
