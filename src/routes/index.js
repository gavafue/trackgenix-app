import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import PrivateRoute from 'routes/privateRoute';

const AdminRoutes = lazy(() => import('routes/admin'));
const EmployeeRoutes = lazy(() => import('routes/employee'));
const AuthRoutes = lazy(() => import('routes/auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
