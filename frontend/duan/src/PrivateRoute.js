import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'store/auth.store';

const PrivateRoute = ({ children }) => {
  // const customer = useSelector((state) => state.customer.userInfo.data);
  const {userInfo} = useAuthStore();
  const isAdmin = userInfo.data && userInfo.data.roleNames && userInfo.data.roleNames.some(role => role === 'ADMIN');

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
