import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');
  const error = useSelector((state) => state.auth.error);

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (token) {
          console.log(role);
          console.log('props', props.role);
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
