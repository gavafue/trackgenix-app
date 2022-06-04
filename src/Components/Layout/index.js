import Header from '../Header/index';
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
function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/admins" component={Admins} />
        <Route path="/admins/form" component={AdminsForm} />
        <Route path="/super-admins" component={SuperAdmins} />
        <Route path="/super-admins/form" component={SuperAdminsForm} />
        <Route path="/employees" component={Employees} />
        <Route path="/employees/form" component={EmployeesForm} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/form" component={ProjectsForm} />
        <Route path="/time-sheets" component={TimeSheets} />
        <Route path="/time-sheets/form" component={TimeSheetsForm} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/tasks/form" component={TasksForm} />
      </Switch>
      <Footer />
    </div>
  );
}

export default Layout;
