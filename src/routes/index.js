import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Preloader from 'Components/Shared/Preloader';

const EmployeeRoutes = lazy(() => import('routes/employee'));
const AdminRoutes = lazy(() => import('routes/admin'));
const SuperadminRoutes = lazy(() => import('routes/superadmin'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Switch>
          <Route path="/employee" component={EmployeeRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/superadmin" component={SuperadminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
