import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header/index';
import Navbar from 'Components/Shared/Navbar';
import Footer from 'Components/Shared/Footer/index';
import Preloader from 'Components/Shared/Preloader';
import PrivateRoute from 'routes/privateRoute';
import Login from 'Components/Auth/Login';
import Home from 'Components/Shared/Home/index';
import Admins from '../Admins/index';
import AdminsForm from '../Admins/Form';
import Employees from '../Employees/index';
import EmployeesForm from '../Employees/Form';
import SuperAdmins from '../SuperAdmins/index';
import SAForm from '../SuperAdmins/Form';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form';
import TimeSheets from '../TimeSheets';
import TimeSheetsForm from '../TimeSheets/Form';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form';
const Employee = React.lazy(() => import('routes/employee'));
const Admin = React.lazy(() => import('routes/admin'));
const Superadmin = React.lazy(() => import('routes/superadmin'));

function Layout() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Header />
        <React.Suspense fallback={<Preloader />}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/admins" component={Admins} />
            <Route path="/admins/form/:id" component={AdminsForm} />
            <Route path="/admins/form" component={AdminsForm} />
            <Route exact path="/super-admins" component={SuperAdmins} />
            <Route path="/super-admins/form/:id" component={SAForm} />
            <Route path="/super-admins/form" component={SAForm} />
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
            <PrivateRoute exact path="/employee" role="EMPLOYEE" component={Employee} />
            <PrivateRoute exact path="/admin" role="ADMIN" component={Admin} />
            <PrivateRoute exact path="/superadmin" role="SUPERADMIN" component={Superadmin} />
          </Switch>
        </React.Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
