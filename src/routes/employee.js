import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/EditProfile';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';

const Employee = () => {
  return (
    <Switch>
      <Route path="/employee/home" component={Home} />
      <Route exact path="/employee">
        <Redirect to="/employee/home" />
      </Route>
      <Route path="/employee/timesheet" component={Timesheet} />
      <Route path="/employee/projects" component={Projects} />
      <Route path="/employee/profile" component={Profile} />
    </Switch>
  );
};

export default Employee;
