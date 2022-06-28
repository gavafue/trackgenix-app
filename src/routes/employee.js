import React from 'react';
import { Switch, PrivateRoute, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/EditProfile';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';

const Employee = () => {
  return (
    <Switch>
      <PrivateRoute path="/employee/home" component={Home} />
      <PrivateRoute exact path="/employee">
        <Redirect to="/employee/home" />
      </PrivateRoute>
      <PrivateRoute path="/employee/timesheet" component={Timesheet} />
      <PrivateRoute path="/employee/projects" component={Projects} />
      <PrivateRoute path="/employee/profile" component={Profile} />
    </Switch>
  );
};

export default Employee;
