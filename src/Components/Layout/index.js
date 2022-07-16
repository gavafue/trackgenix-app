import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import styles from './layout.module.css';
import Header from 'Components/Shared/Header/index';
import Navbar from 'Components/Shared/Navbar';
import Footer from 'Components/Shared/Footer/index';
import Preloader from 'Components/Shared/Preloader';
import PrivateRoute from 'routes/privateRoute';
import Login from 'Components/Auth/Login';
import Home from 'Components/Shared/Home/index';
import Admins from 'Components/Admins';
import AdminsForm from 'Components/Admins/Form';
import Employees from 'Components/Employees/index';
import EmployeesForm from 'Components/Employees/Form';
import Projects from 'Components/Projects';
import ProjectsForm from 'Components/Projects/Form';
import Superadmins from 'Components/SuperAdmins';
import SuperadminsForm from 'Components/SuperAdmins/Form';
import TimeSheets from 'Components/TimeSheets';
import TimeSheetsForm from 'Components/TimeSheets/Form';
import Tasks from 'Components/Tasks/index';
import TasksForm from 'Components/Tasks/Form';

const Employee = lazy(() => import('routes/employee'));
const Admin = lazy(() => import('routes/admin'));
const Superadmin = lazy(() => import('routes/superadmin'));
const AuthRoutes = lazy(() => import('routes/auth'));

function Layout() {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <Header />
        <Suspense fallback={<Preloader />}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/admins" component={Admins} />
            <Route path="/admins/form/:id" component={AdminsForm} />
            <Route path="/admins/form" component={AdminsForm} />
            <Route path="/employees" component={Employees} />
            <Route path="/employees/form/:id" component={EmployeesForm} />
            <Route path="/employees/form" component={EmployeesForm} />
            <Route path="/projects" component={Projects} />
            <Route path="/projects/form/:id" component={ProjectsForm} />
            <Route path="/projects/form" component={ProjectsForm} />
            <Route path="/super-admins" component={Superadmins} />
            <Route path="/super-admins/form/:id" component={SuperadminsForm} />
            <Route path="/super-admins/form" component={AdminsForm} />
            <Route path="/time-sheets" component={TimeSheets} />
            <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
            <Route path="/time-sheets/form" component={TimeSheetsForm} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/tasks/form/:id" component={TasksForm} />
            <Route path="/tasks/form" component={TasksForm} />
            <PrivateRoute path="/employee" role="EMPLOYEE" component={Employee} />
            <PrivateRoute path="/admin" role="ADMIN" component={Admin} />
            <PrivateRoute path="/superadmin" role="SUPERADMIN" component={Superadmin} />
            <Route path="/auth" component={AuthRoutes} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
