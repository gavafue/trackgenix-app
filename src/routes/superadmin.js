import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import SuperAdmins from 'Components/SuperAdmins/index';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin/index';
const Superadmin = () => {
  return (
    <Switch>
      <Route path="/addAdmin" component={AddNewAdmin} />
    </Switch>
  );
};

export default Superadmin;
