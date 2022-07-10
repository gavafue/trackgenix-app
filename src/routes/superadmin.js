import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmins from 'Components/SuperAdmins/index';
import SAForm from 'Components/SuperAdmins/Form';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin';
const Superadmin = () => {
  return (
    <Switch>
      <Route exact path="/" component={SuperAdmins} />
      <Route path="/form/:id" component={SAForm} />
      <Route path="/form" component={SAForm} />
      <Route path="/addAdmin" component={AddNewAdmin} />
    </Switch>
  );
};

export default Superadmin;
