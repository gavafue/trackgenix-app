import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminList from 'Components/SuperAdmin/AdminsList/index';
import AddNewAdmin from 'Components/SuperAdmin/RegisterAdmin/index';
import Home from 'Components/Shared/Home';

const Superadmin = () => {
  return (
    <Switch>
      <Route path="/superadmin/home" component={Home} />
      <Route path="/superadmin/adminsList" component={AdminList} />
      <Route path="/superadmin/addAdmin" component={AddNewAdmin} />
      <Route exact path="/superadmin">
        <Redirect to="/superadmin/home" />
      </Route>
    </Switch>
  );
};

export default Superadmin;
