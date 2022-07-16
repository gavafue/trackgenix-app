import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin/index';
const Superadmin = () => {
  return (
    <Switch>
      <Route path="/superadmin/addAdmin" component={AddNewAdmin} />
    </Switch>
  );
};

export default Superadmin;
