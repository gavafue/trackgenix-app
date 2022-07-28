import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomeForUser from 'Components/Shared/HomeForUser';
import AdminProfile from 'Components/Admin/EditProfile';
import Employees from 'Components/Employees/index';
import EmployeesForm from 'Components/Employees/Form';
import Projects from 'Components/Projects';
import ProjectsForm from 'Components/Projects/Form';
const Admin = () => {
  return (
    <Switch>
      <Route exact path="/admin" component={HomeForUser} />
      <Route path="/admin/profile" component={AdminProfile} />
      <Route exact path="/admin/employees" component={Employees} />
      <Route path="/admin/employees/form/:id" component={EmployeesForm} />
      <Route path="/admin/employees/form" component={EmployeesForm} />
      <Route exact path="/admin/projects" component={Projects} />
      <Route path="/admin/projects/form/:id" component={ProjectsForm} />
      <Route path="/admin/projects/form" component={ProjectsForm} />
    </Switch>
  );
};

export default Admin;
