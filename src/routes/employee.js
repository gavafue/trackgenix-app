import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/EditProfile';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';
import { getEmployeeById } from 'redux/employees/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Employee = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeById('62998834f7d152003b124d36'));
  }, []);
  const employeeShinji = useSelector((state) => state.employees.list);
  const shinjiSelected = Object.keys(employeeShinji).length;
  console.log(employeeShinji);
  if (shinjiSelected) {
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
  } else {
    return <h1>hola</h1>;
  }
};

export default Employee;
