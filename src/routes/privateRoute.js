import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.auth.authenticated.role);
  const error = useSelector((state) => state.auth.error);
  const token = sessionStorage.getItem('token');
  const status = useSelector((state) => state.auth.authenticated.data.active) || '';

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (token) {
          if (status === false) {
            return <Redirect to={'/auth/accountInactive'} />;
          }
          if (role === props.role) {
            return <RouteComponent {...routeProps} />;
          }
          if (role && !error) {
            return <Redirect to={'/auth/notAllowed'} />;
          }
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
