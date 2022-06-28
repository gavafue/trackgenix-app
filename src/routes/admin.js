import React from 'react';
import { Switch, PrivateRoute } from 'react-router-dom';

const Admin = () => {
  return (
    <Switch>
      <PrivateRoute path="/admin" component={Admin} />
    </Switch>
  );
};

export default Admin;
