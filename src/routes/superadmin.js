import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SuperAdmin from 'Components/SuperAdmin/index';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin/index';

const Superadmin = () => {
  return (
    <Switch>
      <Route exact path="/superadmin" component={SuperAdmin} />
      <Route path="/superadmin/addAdmin" component={AddNewAdmin} />
    </Switch>
  );
};

export default Superadmin;
