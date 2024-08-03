import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const customer = useSelector((state) => state.customer.userInfo.data);
  const isAdmin = customer && customer.roleNames && customer.roleNames.some(role => role === 'ADMIN');

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
