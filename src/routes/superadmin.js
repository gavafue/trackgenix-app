import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins/index';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin';
const Superadmin = () => {
  return (
    <Switch>
      <Route path="/" component={SuperAdmins} />
      <Route path="/add-admin" component={AddNewAdmin} />
    </Switch>
  );
};

export default Superadmin;
