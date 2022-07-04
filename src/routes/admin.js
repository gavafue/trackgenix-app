import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admins from 'Components/Admins/index';
import AdminsForm from 'Components/Admins/Form';
const Admin = () => {
  return (
    <Switch>
      <Route exact path="/admins" component={Admins} />
      <Route path="/admins/form/:id" component={AdminsForm} />
      <Route path="/admins/form" component={AdminsForm} />
    </Switch>
  );
};

export default Admin;
