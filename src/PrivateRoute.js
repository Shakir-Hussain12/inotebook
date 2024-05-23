/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('status')) || false;
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
