import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('status')) || false;

  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
