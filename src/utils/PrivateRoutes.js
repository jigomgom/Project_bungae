import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
function PrivateRoutes() {
let isAuthUser = !!localStorage.getItem("login-token");
  return (
    isAuthUser ? <Outlet/> : <Navigate to="/"/>
  )
}
export default PrivateRoutes