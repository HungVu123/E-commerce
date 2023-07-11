import React from 'react'
import { Outlet } from 'react-router-dom';
import { Elements } from "@stripe/react-stripe-js";

export default function ElementsRoute({ stripe }) {
  return (
    <Elements stripe={stripe}>
    <Outlet />
  </Elements>
  )
}
