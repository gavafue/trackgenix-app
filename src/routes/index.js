import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from 'Components/Layout';
import PrivateRoute from './privateRoute';
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
import AccountInactive from 'Components/Auth/Errors/AccountInactive';
import NotAllowed from 'Components/Auth/Errors/NotAllowed';
import RegisterEmployee from 'Components/Auth/Register/registerEmployee';
import AdminProfile from 'Components/Admin/EditProfile';
const Employee = lazy(() => import('routes/employee'));
const Admin = lazy(() => import('routes/admin'));
const Superadmin = lazy(() => import('routes/superadmin'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route exact path="/admins" component={Admins} />
        <Route path="/admins/form/:id" component={AdminsForm} />
        <Route path="/admins/form" component={AdminsForm} />
        <Route exact path="/super-admins" component={Superadmins} />
        <Route path="/super-admins/form/:id" component={SuperadminsForm} />
        <Route path="/super-admins/form" component={AdminsForm} />
        <Route exact path="/time-sheets" component={TimeSheets} />
        <Route path="/time-sheets/form/:id" component={TimeSheetsForm} />
        <Route path="/time-sheets/form" component={TimeSheetsForm} />
        <Route exact path="/tasks" component={Tasks} />
        <Route path="/tasks/form/:id" component={TasksForm} />
        <Route path="/tasks/form" component={TasksForm} />
        <Route path="/accountinactive" component={AccountInactive} />
        <Route path="/notAllowed" component={NotAllowed} />
        <Route path="/register/employee" component={RegisterEmployee} />
        <PrivateRoute path="/employee" role="EMPLOYEE" component={Employee} />
        <PrivateRoute exact path="/admin" role="ADMIN" component={Admin} />
        <PrivateRoute path="/admin/profile" role="ADMIN" component={AdminProfile} />
        <PrivateRoute exact path="/employees" role="ADMIN" component={Employees} />
        <PrivateRoute path="/employees/form/:id" role="ADMIN" component={EmployeesForm} />
        <PrivateRoute path="/employees/form" role="ADMIN" component={EmployeesForm} />
        <PrivateRoute exact path="/projects" role="ADMIN" component={Projects} />
        <PrivateRoute path="/projects/form/:id" role="ADMIN" component={ProjectsForm} />
        <PrivateRoute path="/projects/form" role="ADMIN" component={ProjectsForm} />
        <PrivateRoute path="/superadmin" role="SUPERADMIN" component={Superadmin} />
        <Route path="/auth" component={AuthRoutes} />
      </Switch>
    </Layout>
  );
};

export default Routes;
