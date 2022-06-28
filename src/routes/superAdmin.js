import React from 'react';
import { Switch, PrivateRoute } from 'react-router-dom';

const SuperAdmin = () => {
  return (
    <Switch>
      <PrivateRoute path="/super-admin" component={SuperAdmin} />
    </Switch>
  );
};

export default SuperAdmin;
