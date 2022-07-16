import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins/index';
import SAForm from 'Components/SuperAdmins/Form';
const Superadmin = () => {
  return (
    <Switch>
      <Route exact path="/" component={SuperAdmins} />
      <Route path="/super-admin/form/:id" component={SAForm} />
      <Route path="/super-admin/form" component={SAForm} />
    </Switch>
  );
};

export default Superadmin;
