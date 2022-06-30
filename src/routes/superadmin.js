import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Superadmin = () => {
  return (
    <Switch>
      <Route path="/superadmin" component={Superadmin} />
    </Switch>
  );
};

export default Superadmin;
