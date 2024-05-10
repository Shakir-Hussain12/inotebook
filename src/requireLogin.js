import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withRequireLogin = (WrappedComponent) => {
  const CheckLogin = (props) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    useEffect(() => {
      const currentPath = window.location.pathname;
      if (!isLoggedIn && currentPath !== '/SignUp') {
        window.location.href = '/SignUp';
      }
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return CheckLogin;
};

export default withRequireLogin;
