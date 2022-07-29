import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.auth.authenticated.role);
  const token = sessionStorage.getItem('token');
  const status = useSelector((state) => state.auth.authenticated.data.active);
  const logged = useSelector((state) => state.auth.authenticated.data);

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
          if (logged || role === props.role) {
            return <RouteComponent {...routeProps} />;
          }
        }
        return <Redirect to={'/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
