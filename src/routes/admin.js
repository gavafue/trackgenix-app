import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';

const Admin = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin" component={Admin} />
    </Switch>
  );
};

export default Admin;
