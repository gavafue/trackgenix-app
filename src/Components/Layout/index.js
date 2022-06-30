import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Preloader from 'Components/Shared/Preloader';
import Navbar from 'Components/Shared/Navbar';
import Header from 'Components/Shared/Header/index';
import Footer from 'Components/Shared/Footer/index';
import PrivateRoute from 'routes/privateRoute';
const Home = React.lazy(() => import('Components/Shared/Home/index'));
const Admins = React.lazy(() => import('Components/Admins/index'));
const AdminsForm = React.lazy(() => import('Components/Admins/Form'));
const Employees = React.lazy(() => import('Components/Employees/index'));
const EmployeesForm = React.lazy(() => import('Components/Employees/Form'));
const SuperAdmins = React.lazy(() => import('Components/SuperAdmins/index'));
const SAForm = React.lazy(() => import('Components/SuperAdmins/Form'));
const Projects = React.lazy(() => import('Components/Projects/index'));
const ProjectsForm = React.lazy(() => import('Components/Projects/Form'));
const TimeSheets = React.lazy(() => import('Components/TimeSheets/index'));
const TimeSheetsForm = React.lazy(() => import('Components/TimeSheets/Form'));
const Tasks = React.lazy(() => import('Components/Tasks/index'));
const TasksForm = React.lazy(() => import('Components/Tasks/Form'));
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
            <PrivateRoute exact path="/admins" role="SUPERADMIN" component={Admins} />
            <PrivateRoute path="/admins/form/:id" role="SUPERADMIN" component={AdminsForm} />
            <PrivateRoute path="/admins/form" role="SUPERADMIN" component={AdminsForm} />
            <PrivateRoute exact path="/super-admins" role="SUPERADMIN" component={SuperAdmins} />
            <PrivateRoute path="/super-admins/form/:id" role="SUPERADMIN" component={SAForm} />
            <PrivateRoute path="/super-admins/form" role="SUPERADMIN" component={SAForm} />
            <PrivateRoute exact path="/employees" role="ADMIN" component={Employees} />
            <PrivateRoute path="/employees/form/:id" role="ADMIN" component={EmployeesForm} />
            <PrivateRoute path="/employees/form" role="ADMIN" component={EmployeesForm} />
            <PrivateRoute exact path="/projects" role="ADMIN" component={Projects} />
            <PrivateRoute path="/projects/form/:id" role="ADMIN" component={ProjectsForm} />
            <PrivateRoute path="/projects/form" role="ADMIN" component={ProjectsForm} />
            <PrivateRoute exact path="/time-sheets" role="ADMIN" component={TimeSheets} />
            <PrivateRoute path="/time-sheets/form/:id" role="ADMIN" component={TimeSheetsForm} />
            <PrivateRoute path="/time-sheets/form" role="ADMIN" component={TimeSheetsForm} />
            <PrivateRoute exact path="/tasks" role="ADMIN" component={Tasks} />
            <PrivateRoute path="/tasks/form/:id" role="ADMIN" component={TasksForm} />
            <PrivateRoute path="/tasks/form" role="ADMIN" component={TasksForm} />
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
