import React, { useEffect } from 'react';

const isLoggedIn = JSON.parse(localStorage.getItem('status')) || false;
const isAuthenticated = JSON.parse(localStorage.getItem('auth')) || false;

const withRequireLogin = (WrappedComponent) => {
  const CheckLogin = (props) => {
    useEffect(() => {
      const currentPath = window.location.pathname;
      if ((!isLoggedIn && currentPath !== '/auth') || (isLoggedIn && !isAuthenticated && currentPath !== '/auth')) {
        window.location.href = '/auth';
      }
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return CheckLogin;
};

export default withRequireLogin;
