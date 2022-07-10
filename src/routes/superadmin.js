import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmin from 'Components/SuperAdmin/index';
import SAForm from 'Components/SuperAdmins/Form';
const Superadmin = () => {
  return (
    <Switch>
      <Route path="/" component={SuperAdmin} />
      <Route path="/form/:id" component={SAForm} />
      <Route path="/form" component={SAForm} />
    </Switch>
  );
};

export default Superadmin;
