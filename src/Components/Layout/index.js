import Header from '../Header/index';
import Navbar from '../Navbar';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsForm from '../SuperAdmins/Form';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form';
import TimeSheets from '../TimeSheets';
import TimeSheetsForm from '../TimeSheets/Form';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Loader from 'Components/Shared/Preloader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEmployeeById } from 'redux/employees/thunks';

const Employee = lazy(() => import('routes/employee'));

function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployeeById('62998834f7d152003b124d36'));
  }, []);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/form/:id" component={AdminsForm} />
          <Route path="/admins/form" component={AdminsForm} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route path="/super-admins/form/:id" component={SuperAdminsForm} />
          <Route path="/super-admins/form" component={SuperAdminsForm} />
          <Route exact path="/employees" component={Employees} />
          <Route path="/employees/form/:id" component={EmployeesForm} />
          <Route path="/employees/form" component={EmployeesForm} />
          <Route exact path="/projects" component={Projects} />
          <Route path="/projects/form/:id" component={ProjectsForm} />
          <Route path="/projects/form" component={ProjectsForm} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
          <Route path="/time-sheets/form" component={TimeSheetsForm} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/form/:id" component={TasksForm} />
          <Route path="/tasks/form" component={TasksForm} />
          <Suspense fallback={Loader}>
            <Route path="/employee" component={Employee} />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
