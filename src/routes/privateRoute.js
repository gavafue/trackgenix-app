import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');
  const status = JSON.parse(sessionStorage.getItem('userStatus'));

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (token) {
          if (status === false) {
            return <Redirect to={'/accountInactive'} />;
          }
          if (role && role != props.role) {
            return <Redirect to={'/notAllowed'} />;
          }
          if (role === props.role) {
            return <RouteComponent {...routeProps} />;
          }
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
